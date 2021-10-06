---
title: "Using Rust unions for implict tagging"
attrib:
  - smitop
category: "rust"
tags: ["programming", "rust"]
---

Here is a Rust microoptimization to avoid storing a tag in an `enum` when the tags can be inferred. This might be helpful is you have a lot of small `enum`s and need to shave as much memory usage as you can from each.

Here's the type of `enum` that might benefit from this. Here, records after a certain time (say `1600000000000`) have a different format. But we can infer that from the date itself.

```rs
enum TravelLog {
    // Old records use a weird measurement system, with inaccurate data.
    Legacy {
        date: u32,
        miles: u16,
    },
    // Newer records use more accurate data.
    New {
        date: u32,
        centimeters: u64
    },
}
```

Here's a better way:

```rs
#[derive(Copy, Clone)]
struct Legacy {
    date: u32,
    miles: u16,
}

#[derive(Copy, Clone)]
struct New {
    date: u32,
    centimeters: u64
}

union TravelLog {
    legacy: Legacy,
    new: New,
}
```

This allows us to avoid storing the tag, since it can be implictly derived from the date.
