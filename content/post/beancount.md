+++
date = "2026-04-17T00:00:00Z"
description = "Using Beancount to track all my personal finances in a text file"
tags = ["life"]
title = "How I used plain-text accounting"
+++

Until around the end of 2024 I had an elaborate personal finance system that I used to keep track of every financial transaction I made (money transfers, credit card purchases, wages, etc), using [Beancount](https://github.com/beancount/beancount/), which is based on [Ledger](https://ledger-cli.org/index.html), to implement [plain-text accounting](https://plaintextaccounting.org).

This system had a lot of neat advantages! I had a detailed record of every transaction I ever made, but more importantly I could use [Fava](https://beancount.github.io/fava/), a nice web interface to Beancount, to view a lot of useful data. (There's [an online demo](https://fava.pythonanywhere.com/example-beancount-file/income_statement/) available.) I could see a graph of my net worth (stacked by asset type) for every day in the past 3 years, a detailed pie chart of my current asset allocation among accounts, and a bunch of other really useful things. This was also super useful for taxes; I could easily see what my total taxable income for the current year had been up to a given point.

Unfortunately this system involved a lot of manual work (mostly categorizing credit card transactions and tracking interest/dividends), and I was making too many transactions for the manual overhead to be worth it. But now that we have much better AI capabilities, I think it might be worth it for me to revive it again by having an LLM automate the manual categorization work I had been doing by hand. In this post I'll describe how the system used to work.

## Beancount setup

I store all of my records in [my personal monorepo](https://iter.ca/post/monorepo/). Currently almost everything is in one massive beancount file that stretches 3 years of transactions; I think going forward it's probably worth it to have one file per year (or maybe month?) to be able to track things easier (probably also good for ensuring the right stuff is in the LLMs context window). The only Beancount transactions in separate files right now are generated asset pricing files (see below).

A simple transaction looks like this[^cb]:

[^cb]: The real version of this also had an entry for credit-card cashback, but I'm not going to track that going forward because I don't get a lot of it and there's no way to automatically figure out what category it's in (my card gives me more cashback for certain merchant categories).

```
2021-05-03 * "Bakery Garden Cafe" "SQ *BAKERY GARDEN CAFE"
  Liabilities:Banking:BMO:Credit-1   -11.07 CAD
  Expenses:Food:Restaurant            11.07 CAD
  ```

Breaking that down:
- `2021-05-03` is the date
- `*` says it's a transaction
- "Bakery Garden Cafe" is the name of the merchant (so I can analyze transactions by merchant)
- "SQ \*BAKERY GARDEN CAFE" is free-form text about the transaction; here it's the statement descriptor
- I'm posting a $11.07 credit to the account for my credit card and a $11.07 debit to the account that tracks what I spend at restaurants

The overall structure of my Beancount file looks like (simplified a bit) this; I'll explain the interesting bits later in the post:

```
* Options
option "operating_currency" "CAD"
option "booking_method" "LIFO"
option "inferred_tolerance_default" "USD:0.001"
2022-10-18 custom "fava-option" "language" "en"
2022-10-18 custom "fava-option" "default-page" "balance_sheet/?conversion=at_value&time=2024&interval=day"
option "documents" "/rs1/docs"
plugin "fava.plugins.tag_discovered_documents"

* Accounts
2000-01-01 open Equity:Opening-Balances
2000-01-01 open Income:Gains:Forex CAD ; (and losses)

** Income/Expenses

2022-06-01 open Income:Work
2022-06-01 open Expenses:Housing
2022-06-01 open Expenses:Housing:Furniture
2023-01-01 open Expenses:Housing:Supplies
2022-01-01 open Expenses:Food
2022-01-01 open Expenses:Food:Restaurant
[... more accounts ...]

* Includes
include "bankofcanada.beancount"

* Transactions
2021-05-03 * "Bakery Garden Cafe" "SQ *BAKERY GARDEN CAFE"
  Liabilities:Banking:BMO:Credit-1   -11.07 CAD
  Expenses:Food:Restaurant            11.07 CAD
[... ~three years of transactions ...]
```

### Balance assertions

One other cool thing Beancount has is *balance assertions*, which let you assert what the balance of an account is at a certain time. E.g.

```
2024-02-25 balance Assets:Banking:BMO:Checking-1  960.26 CAD
```

This is helpful when I'm cross-referencing my records with my actual bank account balance to ensure that my financial records reflect reality.

### Documents

Another cool thing is that you can attach documents to transactions, and then you can easily pull up the documents associated with a transaction from Fava. You can specify an attached document like this:

```
2023-02-15 *
  document: "2023-02-15 purchase-invoice-12345.pdf"
  [...]
```

And Beancount/Fava will look for that document in the path specified in the config.

## Accounts

There are 5 types of account in Beancount: Assets, Liabilities, Income, Expenses, and Equity; the first token in an account name has to be one of those. But there are really only three kinds of account, because Liabilities are just Assets that are usually negative and Expenses are just Income that are usually positive. Equity is its own thing that you rarely need to interact with when you're doing accounting for your personal finances. There's nothing stopping you from having a positive balance in a Liabilities account though, it's just a convention.

Beancount implements double-entry accounting, negative/positive numbers instead of credits/debits. (I think positive numbers are like debits and vice versa?) This means that assets are positive (and liabilities are negative), while income is *negative* and expenses are *positive*. This makes a lot of sense if you meditate on the nature of double-entry accounting for a while, but it's confusing at first.

Because Beancount uses double-entry accounting, all transactions must sum to 0. If you earn income or reduce your assets (which are negative changes), you have to also have a corresponding positive increase (e.g. through expenses or increases in assets).

I handle my income on an accrual basis – income is recorded when it's *earned*, not when it's paid. So when I earn income it gets recorded in a `Assets:Accounts-Receivable:[payee]` subaccount, then moved to a different account in a separate transaction when I'm paid.

## Automatic updates

I did a lot of work to automate the process of importing credit card transactions into my system, because card transactions are the bulk of the transactions I make (all the other non-card transactions I processed manually).

Unfortunately, few banks have an API to fetch credit card transactions. But my bank *does* have an option to have an email notification on every transaction, and emails can of course be parsed programmatically. So my pipeline was to change the email address on my account to a provider that lets you get a webhook notification on every email, then on that webhook:

1. Check if it's an email about a card transaction (stopping otherwise)
2. Parse out the amount spent and statement descriptor
3. Create a transaction object based on that info, basing the merchant name and expense account on the statement descriptor
4. Serialize that transaction object to Beancount text
5. Append that transaction to the Beancount file
6. Add/commit and push the change to my monorepo 

This depends on a bunch of custom logic to extract details from the statement descriptor. Most of the logic was in a big match statement that looked like this for the merchant name:

```
match desc {
    _ if lower_desc.contains("amz") => "Amazon",
    _ if lower_desc.contains("amazon") => "Amazon",
    _ if lower_desc.contains("shoppersdrug") => "Shoppers Drug Mart",
    [...]
    _ => desc,
}
```

and then parsing the merchant into an account:

```
match &*merchant {
    "Presto" => "Expenses:Transport:Public",
    "Loblaws" | "Instacart" => "Expenses:Food:Groceries",
    [...]
    _ => return None,
}
```

Of course I couldn't cover every account in that logic, so I had it default to using `Equity:TODO` as the account if it couldn't pattern match to a known account type. I think using LLMs could probably help a lot here, by letting the LLM see the list of accounts and a statement descriptor and having it match the transaction to an account.

When I revive this system I plan on adding support for other credit cards I use, and to add a web UI so I can easily enter in transactions on my phone. I hosted the webhook receiver on [Fly.io](https://fly.io/), which is a pretty nice hosting service for servers that scales to zero, so the server only need to be started when there's an occasional request.

## Asset pricing

I use the Canadian dollar as a working currency, but I make a lot of USD-denominated purchases. The way I tracked this was actually pretty annoying to deal with because I treated USD like an asset with a valuation that changed over time. So when I earned USD (e.g. through work) I had to check what the current conversion rate was at the time I earned it, then use curly braces to create a new asset lot.

```
2022-09-27 *
  Assets:Accounts-Receivable:Work     500 USD {1.3579486 CAD}
  Income:Work
```

Then I can transfer the funds to a different account later, using `{}` to have Beancount guess the lot:

```
2022-09-29 *
  Assets:Accounts-Receivable:Work    -500 USD {}
  Assets:Banking:BMO:Checking-1       500 USD {}
```

Finally I can pay for something using those USD. This is the annoying part; I have to explicitly specify which lot to pay from and what the current value of the currency is. 

```
2023-03-01 *
  Assets:Banking:BMO:Checking-1       -16.54 USD {1.3013 CAD, 2022-12-31}
  Expenses:Tech:Hosting                22.514248 CAD
  Income:Gains:Forex
```

The last line (`Income:Gains:Forex`) doesn't have a money amount after it, so it's implicitly whatever value would be needed to make the transaction balance (add up to zero). So whatever amount is leftover is booked as foreign exchange gains income. (Sometimes I lost money and this was a forex gains expense. I used the same account for both gains and losses.)

I have a script that automatically fetches [historical daily exchange rates from the Bank of Canada](https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/) (they have a nice JSON API), and creates a file with Beancount-formatted pricing history. That let me see the value of all my assets in CAD.

I handled stocks and ETFs almost the same way as foreign currency. The only difference was that I had to get pricing data from a few different sources (e.g. Yahoo Finance).

Note that Beancount uses lot-based accounting for capital property, which doesn't match how you should track capital property for your taxes in Canada (where you track the adjusted cost base), unless you only buy/sell all of a given kind of property at once.

## Income taxes

The "proper" way to handle income taxes would be to include an income tax expense/liability on every transaction where I earn income. But this would be really annoying in my case, because the taxes I owe are a function of more than just my income; there are also various tax credits and deductible expenses that make it really hard to know how much a given income transaction contributes to my tax burden.

My lazy solution is to just not bother, and include a single annual transaction to account for my income tax liabilities in that year (debiting `Expenses:Tax:CA` (tax expenses) and crediting `Liabilities:Tax:CA:Income` (debt to the government)), and then having a second transaction zeroing out `Liabilities:Tax:CA:Income` with a transfer from my bank account when I pay my taxes.

If I really cared about this I could create a Beancount extension to track my income taxes properly on a per-transaction basis, but I don't care that much.

## Fin

My plan to revive this system is to figure out a way to have an LLM process all my incoming transactions and automatically create Beancount transactions for them. I can get most of my transactions sent to me as emails which I could setup to be sent to the LLM, and LLMs have gotten pretty good at visual processing so I could also set it up so I can send screenshots of transaction confirmations to the LLM for the remaining transactions that I can't get emails for. Then I'll be able to get back to my former glory of amazingly detailed financial records without the pain of having to manually journalize everything.

Now you know everything about how my plain-text accounting personal finance system used to work, before everything fell apart because it took too much manual work and I just gave up on having good records.
