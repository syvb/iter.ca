+++
Title = "AI generation: Panics in Rust"
+++

(`j1-jumbo`, temperature = 0.7)

Let's look at a simple function that panics:
```rust
fn main() -> Result<(), String> {
    let mut buffer = vec![];
    let mut vec = vec![];
    buffer.push("hello".to_string());
    vec.push(&mut buffer[0]);
    panic!("XXX");
}
```
If I compile and run this program, it will panic and print an error message:

```text
thread 'main' panicked at 'XXX', src/main.rs:5:21
```

The error message is pretty clear. The panic happened on line 5, and the error was `"XXX"`. It doesn't matter what `XXX` means, at least something isn't right.

## Wait a minute...

Actually, that's not actually all that helpful. The error message is just the panic message, and that's all it says. But, panics _are_ supposed to say what went wrong. Let's try forcing a panic and see what we get:
```rust
fn main() -> Result<(), String> {
    let mut buffer = vec![];
    let mut vec = vec![];
    buffer.push("hello".to_string());
    vec.push(&mut buffer[0]);
    panic!("XXX");
}
```

```text
thread 'main' panicked at 'XXX', src/main.rs:5:21
```

Wow, that sure is unhelpful. The error message is exactly the same, and `XXX` isn't very helpful either.

## Let's try some prints

In order to figure out what is going wrong, let's add logging statements to our program. It will be helpful to see the values of the variables we are working with when the panic happens.

```rust
fn main() -> Result<(), String> {
    let mut buffer = vec![];
    let mut vec = vec![];
    buffer.push("hello".to_string());
    vec.push(&mut buffer[0]);
    println!("buffer: {}\nvec: {}", buffer, vec);
    panic!("XXX");
}
```

```text
thread 'main' panicked at 'XXX', src/main.rs:5:21
buffer: [hello]
vec: [hello]
```

This is a lot more helpful.