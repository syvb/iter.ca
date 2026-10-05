+++
date = "2026-10-05T00:00:00Z"
description = "how to modify workflows you shouldn't be able to"
tags = ["programming", "github", "security"]
title = "Bypassing the GitHub workflow permission with nested Git tags"
+++

## the `workflow` scope
GitHub has an OAuth scope named `workflow` that has some interesting behavior. With just the `repo` scope, you can edit files in all the repos the user can access, except for GitHub Actions workflow files. This means that an attacker with `repo` OAuth access can’t extract Actions secrets. When GitHub created Actions, they added a new `workflow` permission (to be granted alongside `repo`) that lets you modify workflow files.

To implement this, GitHub has to implement *file-level* access control with Git, which Git doesn’t natively support and is hard to do correctly. I’ve found like five different ways to bypass the `workflow` permission. (Most of those issues were a result of the fact that there are a lot of ways (some of which are pretty non-obvious) you can trigger Git operations through the GitHub API, and GitHub forgot to add a workflow permission check for some obscure way you can change what the most recent commit[^commits] on a branch is.)

## git tags
Normally Git tags point to commits. But Git actually lets tags point to any kind of Git object (blobs, trees, commits, tags). So you can have a Git tag that points to another Git tag. This is occasionally actually useful: you might have `v1.0`, `v1.1`, and `v1.2` tags that point to commits at various versions, and a `v1` tag that points to the most recent version tag. In practice though nested tags are rarely used for anything.

## the bug
If you had a three-layer nested tag, the part of the code[^source] that checked if a push is okay would get an error from a GitRPC[^gitrpc] call because it had a recursion limit (to stop DoS issues I guess?). But instead of failing pushes when it hit an error, the code allowed pushes when it hit an error. Oops.

This could let an attacker with just a `repo`-scoped token push workflows and steal workflow secrets. I don’t think this is really that big of a deal – in practice nobody is giving adversaries `repo`-only OAuth access. Furthermore, if you have complicated workflows that run code from files in the repo outside `.github/workflows` (with access to workflow secrets), an attacker could modify those non-workflow files to cause a workflow run and steal those secrets.

## conclusion
I reported this issue to GitHub in Feb 2024, and they apparently thought this is a medium-bad problem (that’s the severity they gave this issue, and other similar workflow-permission-bypasses I reported) so they fixed it and paid and me $4000 and assigned it CVE-2024-8263 in October 2024.

[^gitrpc]: GitHub's (closed-source) thingie for letting the Rails monolith make Git calls but not directly.
[^commits]: It has always been possible to cause a commit that changes workflows to exist in a repo; this isn’t an issue because you can’t trigger workflows on an arbitrary commit with just the `repo` scope. For public repos you can just fork it and push a workflow-changing commit to your fork; GitHub pools Git data across forks such that the same set of commits exists across the base repo and all forks. For private repos that you can’t fork, there’s a more roundabout way to accomplish that.
[^source]: GitHub isn’t open source but you can extract the source code from an Enterprise Server image.
