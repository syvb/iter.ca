+++
date = "2026-03-14T00:00:00Z"
description = "You actually do have to trust PM"
tags = ["crypto", "programming"]
title = "Polymarket isn't trustless"
+++

Polymarket is a smart-contract based prediction market on the Polygon blockchain. It is sometimes claimed to be "trustless", including [by Polymarket](https://docs.polymarket.com/polymarket-101#:~:text=ensuring%20transparent%20and-,trustless%20operation) themselves. Unfortunately this isn't really true, there are several parts of the system that involve a trusted counterparty.

## Order matching is centralized

The entire central-limit order book matching system is centralized. You make orders by sending signed orders to Polymarket's servers. Polymarket does order matching, then broadcasts a transaction which contains all of the matched order pairs. To be clear, the orders have to be signed by the transacting addresses; Polymarket doesn't have the ability to just make up orders but they can censor orders.

One interesting aspect of the CLOB system is the way order cancellation works. When you cancel an unfilled order normally, there isn't any on-chain action: Polymarket just deletes the order from its system and doesn't match it. This means if Polymarket's CLOB system was compromised, cancelled orders could potentially still be filled. Sometimes Polymarket clears orderbooks (e.g. when they make a market clarification); this is basically Polymarket cancelling all open orders.

There is a way you can prevent your cancelled orders from being filled. Every address and order has an associated nonce, and orders can only be filled if the order nonce matches the account nonce[^noncenote]. The only way your account nonce changes is when you call [`incrementNonce()`](https://github.com/Polymarket/ctf-exchange/blob/80cbf37d464c652ba21aa93b73804cbded4952ac/src/exchange/mixins/NonceManager.sol#L9) to bump it, making it impossible for any orders with a nonce lower than your new nonce to be filled.

{{% sidenote %}}
The ability to increment the nonce without the central order-book system knowing immediately (because nonce bumps happen on-chain) means that it's possible for a nonce bump from a user to be included in the same block (or even a few blocks before) as an order fill transaction from the centralized CLOB system. If the nonce bump happens before the order match transaction, then the order match transaction will revert and none of the order matches will actually happen. This can lead to situations where an order appears to be filled, but actually isn't.

It's possible to use this functionality to gain more time to cancel an order before it's finally filled than you would normally get. Some trading bots will bump the nonce of transactions that the CLOB system have already matched to try to back-out of losing trades.
{{% /sidenote %}}

[^noncenote]: This is unrelated to the EVM concept of account nonces that are incremented for every transaction (for EOAs).

I put this once first because unlike the other sources of centralization below which are only a problem if private keys from offline cold wallets are compromised, the CLOB system is necessarily connected to the Internet and handles untrusted input (user orders and blockchain state). It's pretty important Polymarket gets this right!

## Emergency resolve

The Polymarket smart contract which determines how a market should resolve has a [resolveManually](https://github.com/Polymarket/uma-ctf-adapter/blob/8b76cc9e0d46c6f7450a0adb0ddc0f5b0568c9cc/src/UmaCtfAdapter.sol#L253-L256)[^nrn] (called `emergencyResolve` in earlier versions) function that only the admin can call, which bypasses the UMA system and directly resolves the market however the admin wants. AFAIK this has only been used once, to resolve [a market with unclear resolution criteria](https://polymarket.com/event/will-amber-heard-be-found-guilty-of-defaming-johnny-depp) to the current market price.

[^nrn]: The neg-risk adapter contract has a similar function too.

## UMA optimistic oracle proxy can be changed

The Polymarket smart contracts delegate to [UMA](https://uma.xyz/) for market resolution. This is mostly done through `ManagedOptimisticOracleV2`, a smart contract which normally resolves markets to whatever value is initially proposed, but delegates to the UMA Data Verification Mechanism (DVM) if anyone disputes the value[^umamore].

[^umamore]: This is a bit of a simplification; in Polymarket's case the first dispute actually just resets the market and so the DVM isn't actually involved until the second dispute. That logic is implemented in the UMA CTF adapter, not the OO itself though.

[`ManagedOptimisticOracleV2`](https://polygonscan.com/address/0x2C0367a9DB231dDeBd88a94b4f6461a6e47C58B1#code) is a proxy contract which delegates calls to it to an underlying implementation contract. The proxy contract has an owner which can change the proxy implementation to another implementation at anytime, so the proxy owner could change how prediction markets resolve by changing the implementation to a new one with different logic for determining the correct value.

<details>
<summary>Proxy owner notes</summary>
The proxy owner is a Gnosis Safe (essentially a multi-signature wallet) that requires 2-of-2 approval. The two signers are themselves 2-of-4 Gnosis Safes. I had Claude make a diagram:

```
Proxy 0x2C0367a9...C58B1
  └── owner(): Safe 0x7fb449...86fc6 (2-of-2)
        ├── Safe 0x3Dce0a...d952 (2-of-4)
        │     ├── EOA 0xd4848efd79bd87b54f499bd087810e9f6dab9ff1
        │     ├── EOA 0xf65df17d4a5ff0c6822919bc52383168e8e4eef1
        │     ├── EOA 0x80abc332fd22e06b74ea1e248fd3d60fb94a855a
        │     └── EOA 0x00447a08bf275b7fb3d5d832387a54be1090d281
        │
        └── Safe 0x6eE4D9...4146 (2-of-4)
              ├── EOA 0x1d933fd71ff07e69f066d50b39a7c34eb3b69f05
              ├── EOA 0x837219d7a9c666f5542c4559bf17d7b804e5c5fe
              ├── EOA 0x363605c0bde9f1f5053ada30618d95dbfc109bf5
              └── EOA 0xcc400c09ecbac3e0033e4587bdfaabb26223e37d
```
</details>


## Fin
Yeah please don't call Polymarket "trustless", it's not :)

If you have any questions or want to chat you can DM me on Discord as `@moreloops`.
