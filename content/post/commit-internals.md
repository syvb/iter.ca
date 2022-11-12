+++
date = "2022-11-12T00:00:00Z"
description = "How to make a Git commit using Git internals"
tags = ["programming", "git"]
title = "Hiding data in Git commits"
draft = true
+++

TODO: https://jwiegley.github.io/git-from-the-bottom-up/1-Repository/4-how-trees-are-made.html https://git-scm.com/book/en/v2/Git-Internals-Git-Objects

Setup:

```sh
git init
git config gc.auto 0 # don't let Git garbage collect our work in progress
git commit --allow-empty -m "Initial commit"
```

TODO: root commit is special

TODO: `--allow-empty`

TODO: `git cat-file $(git cat-file -t $1) $1`

## Using the porcelain

```sh
$ git commit --allow-empty -m "Test"
```

## Using the plumbing

```sh
$ git write-tree
4b825dc642cb6eb9a060e54bf8d69288fbee4904
```

`4b825dc642cb6eb9a060e54bf8d69288fbee4904` is the hash of the empty tree.

```sh
# hash the data from stdin and write it to the objects database with type commit
hash=$(
git hash-object -w --stdin -t commit <<EOF
tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
parent 57427b1042d87140e68185c265370fdb9c1946ef
author Smitty <me@smitop.com> 1668124857 -0500
committer Smitty <me@smitop.com> 1668124857 -0500
hi there!

This is a commit message
EOF
)
git update-ref HEAD $hash
```
