+++
date = "2026-10-08T00:00:00Z"
description = "i did it and it made me really sad"
tags = ["programming", "email"]
title = "Don't run your own mailserver"
+++

6 years ago I decided it would be fun to run my own mailserver for `@iter.ca` emails. I used [Mail-in-a-Box](https://mailinabox.email) (MIAB) with an Ubuntu VPS that ran everything.
I don’t think this was necessarily a bad decision at the time – I was 16 years old and had a lot of time on my hands to manage mailserver issues.
But it became a bad idea to keep using this setup as soon as I ended up using that email address for actually important stuff (which started happening in like a year).
But I should have migrated to something actually good way earlier than when I actually did (over the last week).

## Thoughts about running my mailserver
### Inbound deliverability
This was actually a bigger problem than outbound deliverability! I previously wrote about [a configuration problem](https://iter.ca/post/dropped-email/) I had that caused some inbound emails to be dropped. Also, MIAB uses greylisting (in a way that’s really annoying to disable) where it fails the first attempt to send an email (requiring the sender to retry the first failed attempt) as an anti-spam thing, but it also means inbound emails often got delayed for a while.
### Outbound deliverability
I don’t send that much outgoing email (like 1-2 per week) but I never had any problems here; I just set up my SPF/DKIM correctly and was fine. If I ever ended up sending a lot of emails this would be a problem, but my life doesn’t really involve sending that many emails.
### Spam
I thought this would be a problem, but it actually wasn’t? Like ~95% of spam emails were correctly sent to spam by SpamAssassin, and almost no non-spam emails were sent there. Probably this is because spammers aren’t really optimizing against solo mailserver operators anymore, but instead focus most of their energy on large providers?
### Security
This is the main reason I decided to stop running my own mailserver. Keeping everything up-to-date is annoying, and a lot of the web-based stuff (e.g. Roundcube) is written in PHP and frequently has issues. I didn’t want to have to keep dealing with the process to upgrade my mailserver to new Ubuntu versions (which is kinda annoying to do with MIAB).
### Catch-all emails
You can easily set up a catchall email and make it so people can send email to any address at your domain. This is neat because it means you can give every service its own email address.
## Migration
I migrated everything to Google Workspace (it supports syncing all the old emails through IMAP), which can handle everything I need (dealing with aliases right is a bit annoying but not too much of a problem). I considered migrating to Fastmail instead but I decided to go with Google because:
- my main email address can be a normal Google account (instead of needing to tell everyone to use a different email when they share Google Docs with me)
- it already integrates with stuff I use (Claude)
- I can convert my existing Google account, and avoid needing to have another inbox to check

I don’t love contributing to centralization in the email ecosystem, but Google is just much better than the other options. It’s not as configurable as my own mailserver (where I can just SSH into it and ask Claude to configure it however I want) but I never really needed much configurability anyways.
## Conclusion
You shouldn’t run your own mailserver for anything important! It’s fine if you want to run one for unimportant stuff that doesn’t matter, but just be careful to not make it handle actually important stuff!
