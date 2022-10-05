---
title: "Gists are actually Git repos"
attrib:
  - smitop
category: "git"
tags: ["github", "git"]
---
[GitHub Gist](https://gist.github.com/) is pastebin-like service for sharing files. They are also Git repos, and can be cloned like any other repo. You can clone them like `git clone https://gist.github.com/Smittyvb/f4a13f0c668754b44aff24bbc25e8d65`. You can find all of the clone URIs by clicking on the Embed dropdown. Each item in the Git revesion history corresponds to an edit of the Gist. You can even push commits using command-line Git to edit your Gists. There are some limitations though: if you try to push a repo containing a directory to a Gist, it will be rejected:

```
remote: Gist does not support directories.
remote: These are the directories that are causing problems:
remote: src
To gist.github.com:65e8a674b43003e945880e9cadab35ad.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'gist.github.com:65e8a674b43003e945880e9cadab35ad.git'
```

There's actually a loophole for this check though: if you create a commit with directories, then remove the directories in the next commit, you can push both commits together, then create a link to the commit with directories. The Gist UI handles this a bit weird: it seems to flatten out the directory structure, and display files across all directories. You *can* push branches, but branches other than `master` aren't linked to in the Gist UI anywhere. You can create a link to commits on other branchs by appending `/[commit]` to the Gist URI though.
