---
title: "Running a single Rust doctest"
se: ["stackoverflow", "66415959"]
license: "CC-BY-SA-4.0" # from SE question
attrib:
  - smitop
  - ["Henry", "https://stackoverflow.com/users/13753914/henry"]
category: "rust"
tags: ["programming", "rust"]
---
Sometimes you want to run a single doctest in Rust. If you have some Rust source code like this:
```rust
/// ## Example
/// ```
/// panic!("doctest #1");
/// ```
/// ```
/// panic!("doctest #2");
/// ```
pub fn first() {}

/// ## Example
/// ```
/// panic!("doctest #3");
/// ```
pub fn second() {}
```

Then you can run `cargo test --doc first` to run `doctest #1` and `doctest #2`, and `cargo test --doc second` to run `doctest #3`. Any tests with a path matching the string after `--doc` will be run.
