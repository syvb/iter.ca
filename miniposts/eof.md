---
title: Exit quickly with EOF
category: "unix"
attrib: ["smitop"]
---

Normally you have to close your terminal emulator, or run `exit` to close Bash. A quicker way to close Bash is to type CTRL-D at an empty command line. This sequence is transformed to a [EOF](https://en.wikipedia.org/wiki/End-of-file) special character, which means that "this input is over" in most Unix contexts. You can use this CTRL-D trick with almost all command-line utilities on Unix, not just Bash.
