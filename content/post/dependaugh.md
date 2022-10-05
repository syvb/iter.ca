+++
date = "2022-07-02T00:00:00Z"
description = "GitHub's automatic vulnerability checking sucks"
tags = ["github", "programming"]
title = "GitHub's automatic vulnerability checking sucks"
ai = "partial"
draft = true
+++

GitHub has a feature called [Dependabot](https://github.com/features/security), which can automatically make pull requests to update dependencies in repos. It is automatically enabled for repos that meet [certain criteria](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates#supported-repositories), and automatically makes PRs that update dependencies it deems vulnerable. This sounds great, but in practice it's not very useful. It makes a lot of security PRs that are unnecessary because:

- the dependency is only used by a build script: the security risk is nil, since the vulnerable dependency is never used at runtime
- the dependency is only used by a test or fixture: again, the security risk is nil, since the vulnerable dependency is never used at runtime
- the vulnerable library code is never called
  - a lot of the time, it is the dependency of a dependency that is vulnerable, but the vulnerable code is never called by the leaf dependency
  - a function may be vulnerable but never called

For [one of my repositories](https://github.com/Smittyvb/ttw), I've got 28 security alerts over the part year. I checked all of them, and *none* were actual issues. Most of them were in build scripts and devDependencies, and the rest were in dependencies that were not actually used or where the vulnerable code was not actually used. GitHub could have eliminated most of the bad alerts by just ignoring ones that are build/devDependencies.

Even worse is security updates in projects I don't maintain anymore. I haven't pushed a commit in two years, is it *really* necessary to let me know about all the security issues in my dependencies?

{{<figure src="/unmaint-gh.png" caption="92 security alerts? really?" alt="Repo header, security tab shows 92 alerts">}}

Here are some examples of the issues I've had with Dependabot:
- Updating transitive dependencies of `webpack-dev-server`, which is only ever run in development on my local machine
- Updating dependencies used to fetch things in a build script, which only connect to trusted servers
- Generating multiple security alerts for the exact same issue (for example, [these](https://github.com/advisories/GHSA-2r2c-g63r-vccr) [three](https://github.com/advisories/GHSA-cfm4-qjh2-4765) [alerts](https://github.com/advisories/GHSA-x4jg-mjrx-434g) are all identical, but get three seperate security alerts)
<!-- - The severity ratings are too high: for my repo with the most alerts, 67% are "high"
  ![](/dependabot-severity.svg) -->

And you can't just disable Dependabot for all of your repos: you have to disable it for each individual repo, which gets annoying if you have 395 repos like me (although apparently I have more repos than most users[^alot]).

[^alot]: Fun fact: I have so many repos that the option to export all my GitHub data times out, and aftering contacting support I learned the only way to export my data was [using the API](https://github.com/Smittyvb/ghexports).

As a result of this, I get quite a bit of useless email from GitHub about non-existent security issues. I do worry that the volume of bad reports means that someday Dependabot will catch an actual issue that needs updating, and I'll miss it because I've started mentally filtering out all the alerts.

Of course, some of the blame here lies with the JavaScript ecosystem, which seems to have a lot of security bugs. ~33% of the issues found by Dependabot in one of my JavaScript projects are [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/), which is an issue entirely unique to JavaScript. Automated security alerts are much less of a problem for Rust dependencies, due to their relative infrequency.

