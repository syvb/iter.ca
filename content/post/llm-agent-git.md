+++
date = "2026-09-12T00:00:00Z"
description = "Git and agent harnesses stuff"
tags = ["security", "git"]
title = "Agent harness security and Git"
+++

I did some cybersecurity research in February 2026 about the intersection of Git and LLM coding agents. I found some interesting stuff, which I’m writing up here! I found some issues relating to malicious bare Git repos inside a normal Git repo. The issues I found mostly relate to LLM agents being able to run commands they aren't supposed to be able to run. I don't think any of the issues I found are really a big deal in practice (in most cases where agents might be doing bad things the solution is to sandbox them, not try to limit what commands they can run), but it was fun to investigate this!

## Buried bare repos

One interesting feature Git has is that you can put a bare repo *inside* a normal repo. This can cause security issues if you’re not careful, since most Git commands can result in arbitrary code execution if run in a repo with a malicious Git directory! If you have a directory structure like this:

```
├── .git
│   └── [real Git repo contents]
├── readme.md
└── sub
    ├── config
    ├── HEAD
    ├── objects
    │   └── .keep
    └── refs
        └── .keep
```

Then it’s not safe to run Git commands in that inner `sub` directory, because it could have malicious Git hooks in `sub/hooks` or malicious config in `sub/config`. When you run Git commands while inside `sub/`, Git walks upwards to find the repo root. Normally it looks for a `.git` subdirectory, but it also treats the directory as a bare repo if it has the right directory structure (`objects/`, `refs/` existing, valid `HEAD`).

An easy way to get many Git commands to do arbitrary command execution is to put something like this in the `config` file:
```
[core]
    repositoryformatversion = 0
    fsmonitor = "echo pwned > /tmp/pwned; echo"
    worktree = "."
```

This takes advantage of `core.fsmonitor`, which is a command many Git sub-commands invoke to check for filesystem changes efficiently.

To be clear, none of this is a bug in Git. The oddities of [this functionality have been known since 2022](https://github.com/justinsteven/advisories/blob/main/2022_git_buried_bare_repos_and_fsmonitor_various_abuses.md), and a few projects (e.g. [libgit2](https://github.com/libgit2/libgit2/tree/main/tests/resources/testrepo.git)) use this functionality so that they can have test Git repos inside the main Git repo they use for development. In Git 3.0 (which will have [many breaking changes](https://github.com/git/git/blob/fa7f9290efe2bd22dd736689597b474b93798e11/Documentation/BreakingChanges.adoc#changes)), the default behavior will be changed so that bare repos have to be explicitly specified with `--git-dir` (or `GIT_DIR`). This issue also causes some rizzed up shells to run attacker-controlled code when cd’ing into an attacker-controlled directory.

It *is* safe (in theory[^gitbad]) to run Git commands in a repo with untrusted contents that you just cloned, since here the `.git` directory is created by Git, not an attacker. The trick here is that you can make a subdirectory inside a repo such that the *subdirectory itself* looks like a repo, then put your evil hooks or configuration inside that fake inner repo. 

[^gitbad]: There have been several security issues with Git in the past where running Git commands in your own clone has led to code execution.

## Coding agents
Agent harnesses often allow the coding agent to run low-risk read-only commands without user approval. Claude Code has an auto mode where an LLM classifier decides if commands are okay to run; there, low-risk read-only commands aren’t shown to the LLM classifier but instead are always allowed.

### Claude Code
The security model for Claude Code is pretty non-obvious to me! My current impression is that the rules are:
- You must never run Claude Code in an untrusted directory
- Claude shouldn’t be able to do anything other than read/write without having the user (in manual or accept edits mode), or LLM classifier (in auto mode) approve it

I found that in accept edits mode, Claude could create a nested bare Git repo (by creating the directories and relevant files in it) and do `cd ... && git status` to run arbitrary code without user approval, since `git status` is on the readonly allowlist, and the agent can always change the path. The harness blocked writing to `.git/` directly, but didn’t block writing to bare repos (since you can’t know if a path is in a bare repo from just the path).

I told Anthropic about this in February; my report was marked as a duplicate[^antdup] and it’s now fixed by not allowlisting `cd` and `git` in the same command.

[^antdup]: Originally it was closed because I misunderstood the security model and thought this was an issue in manual mode, but after I understood the actual security model I noted that it was an issue in accept edits mode; it was then re-opened and closed as a duplicate.

### Codex
Originally Codex (OpenAI’s coding harness) auto-allowed Git commands when it shouldn’t, similar to Claude Code. This was only a security issue on Windows, since on other platforms it ran commands in a sandbox by default. I emailed[^whe] OpenAI about this on Feb 12, and (coincidentally) on the same day they fixed this whole class of issues by running commands in an isolated sandbox on Windows too (and requiring permission to run commands outside the sandbox). (They told me about that two weeks later.)

But in the interim, they *also* introduced a problem where Codex CLI ran `git status` on startup, which could lead to code execution after the trust prompt. This was less bad though, since it’s kinda on you if you say yes at the trust prompt in a malicious directory. I told them about the new problem in late February.

By May they had fixed that, but now were running `git ls-remote https://github.com/openai/plugins.git HEAD` at startup. This doesn’t run fsmonitor, but with an attacker-controlled `config` this is a problem since the attacker can use an `insteadOf` entry to run code:

```
[protocol "ext"]
    allow = always
[url "ext::sh -c id>/tmp/pwned #"]
    insteadOf = https://github.com/
```

I reported that in May, and after a few follow-ups they responded in May and July and fixed it in August. They also removed the built-in allowlist of safe commands.

[^whe]: They have a Bugcrowd page, but I found the disclosure terms unreasonable so I emailed them instead of using that.

### Copilot CLI
I found a Git-related issue in GitHub Copilot CLI, [GHSA-9ccr-r5hg-74gf](https://github.com/github/copilot-cli/security/advisories/GHSA-9ccr-r5hg-74gf)/CVE-2026-45033 (the advisory is LLM-written; I didn’t make it). I found that if you ran Copilot in an untrusted directory it would run a Git command (`git status`) that allowed you to get code execution, *before* it displayed the “Do you trust the files in this folder” prompt. Oops! There were also problems where Git commands could run code without asking for permissions (like in Claude Code/Codex) that were fixed at the same time.

## Do IDEs have this problem?
I checked various IDEs (which often run Git commands) to see if they automatically ran Git commands when opening a folder. VS Code and IntelliJ IDEA both implement some kind of workspace trust system, where you have to say you trust a directory before they enable source control stuff.

I tested Cursor (VS Code fork that adds some extra LLM integration) and it immediately runs several Git commands on startup; it turns out that’s because Cursor disabled the workspace trust system in VS Code by default, so it trusts every directory you open in it automatically.

## How to not have this problem
Generally you should just not run Git commands in untrusted directories, including subdirectories of untrusted repos you just cloned. You can set `git config --global safe.bareRepository explicit` (and this will be the default in Git 3.0) to make it so Git doesn’t auto detect bare repos, but keep in mind that this still doesn’t make it safe to download an untrusted directory and run Git commands in it, because it could have an evil `.git` in it.

If you really have to, there are a few commands that are currently fine to run in untrusted directories (e.g. `git rev-parse --show-toplevel`), but this could change if in the future Git adds new config keys that affect these commands.
