+++
date = "2022-03-28T00:00:00Z"
description = "Breaking all of the safety in Rust"
tags = ["rust", "programming"]
title = "Turning off Rust's borrow checker, completely"
+++

I recently came across [`#[you_can::turn_off_the_borrow_checker]`](https://docs.rs/you-can/latest/you_can/attr.turn_off_the_borrow_checker.html), a Rust macro that makes it so the borrow checker is "turned off" for a function. It transforms the code of a function to transform reference manipulations into unsafe code that does that without the borrow checker knowing.

Of course, this is not the sort of thing you would want to use in production, or really for anything other than education and experimentation. However, it made me curious if it could be implemented at a lower level: can we patch the compiler to remove the borrow checker? Yes.

The obvious way to do that would be to just not run the pass that does borrow checking. The `analysis` pass (technically it's a [query](https://rustc-dev-guide.rust-lang.org/query.html) not a pass but that's not relevant here) of the compiler does a lot of things, including some borrow checking. Let's just not run the `analysis` pass! Just return early so that no analysis is run:

```rust
fn analysis(tcx: TyCtxt<'_>, (): ()) -> Result<()> {
    return Ok(()); // don't actually do any analysis!
    ...
```
{{<rawhtml>}}<br>{{</rawhtml>}}

That makes it so the rest of the function isn't run, and causes an `unreachable statement` warning when compiling the compiler.

This kinda works. Most valid Rust code still works with this patched compiler. It is occasionally prone to internal compiler errors (ICEs), and sometimes you get some extra ✨*bonus errors*✨ as a result of parts of the compiler assuming that parts of the analysis have been performed. But alas, removing the analysis pass still leads to some borrow checking. We're going to need to use the nuclear option: ignoring errors entirely. Deep within the part of the compiler that emits errors is `HandlerInner::emit_diagnostic`, which emits an error diagnostic. Part of that function checks if we're emitting an error, and if so increments a counter:
```rust
if matches!(diagnostic.level, Level::Error { lint: true }) {
    self.bump_lint_err_count();
}
```
{{<rawhtml>}}<br>{{</rawhtml>}}

Before starting codegen, the compiler checks if the error count is non-zero, and aborts if so. But if we just remove that call to `bump_lint_err_count`, the number of errors will always be zero. The errors will still be displayed, but won't prevent compilation from succeeding. Normally the compiler doesn't bail after an error but keeps going, and then only aborts before the next phase of compilation. This makes it so if there are multiple errors with some code, you get to see all of them at once. But by not incrementing the error count, we'll fool the compiler into thinking there are no errors! Here's [the patch](https://github.com/rust-lang/rust/commit/709edf2581ad86d02897ba169eb6d92aeda5c11d) if you want to follow along at home.

This means that errors are generated and displayed, but the patched compiler just ignores the fact that there are errors and tries to generate code anyways.

<!-- {{< dia "triplequestion" "Question" >}}
But what about fatal errors that stop compilation right away?
{{< /dia >}}
{{< dia "a/answer" "Answer" "right" >}}
Yeah, some errors cause the compiler to bail and always cause the compiler to stop compiling right away. Luckily very few errors are fatal in this way! Even things like parsing the code into an AST will do their best to recover from an error.
{{< /dia >}} -->

This can't catch some fatal errors that stop compilation right away, but luckily most errors let the compiler keep going until some future stopping point (but that future stopping point won't happen now, since the error count is always 0).

At this point, I was pretty sure that this wouldn't _actually_ work. It does. Here's [an example of Rust code that the borrow checker doesn't like](https://blog.logrocket.com/introducing-the-rust-borrow-checker/#inpractice):

```rust
fn hold_my_vec<T>(_: Vec<T>) {}

fn main() {
    let v = vec![2, 3, 5, 7, 11, 13, 17];
    hold_my_vec(v);
    let element = v.get(3);

    println!("I got this element from the vector: {:?}", element);
}
```
{{<rawhtml>}}<br>{{</rawhtml>}}

And here's what happens when we run that through our patched compiler:

```rust
error[E0382]: borrow of moved value: `v`
    --> src/main.rs:6:19
     |
4    |     let v = vec![2, 3, 5, 7, 11, 13, 17];
     |         - move occurs because `v` has type `Vec<i32>`, which does not implement the `Copy` trait
5    |     hold_my_vec(v);
     |                 - value moved here
6    |     let element = v.get(3);
     |                   ^^^^^^^^ value borrowed here after move
     |
     = note: borrow occurs due to deref coercion to `[i32]`
note: deref defined here
    --> /home/smit/rustc-dev/rust/library/alloc/src/vec/mod.rs:2434:5
     |
2434 |     type Target = [T];
     |     ^^^^^^^^^^^^^^^^^^

For more information about this error, try `rustc --explain E0382`.
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/rustnoerror`
I got this element from the vector: Some(-501713657)
```
{{<rawhtml>}}<br>{{</rawhtml>}}

There's an error, but due to our patch the compiler just keeps going along. And as a result, the compiled program produces garbage data: `Some(-501713657)` is not an element in the list.

Here's how it handles an example from [`#[you_can::turn_off_the_borrow_checker]`](https://docs.rs/you-can/latest/you_can/attr.turn_off_the_borrow_checker.html#expanded):

```rust
error[E0499]: cannot borrow `owned` as mutable more than once at a time
  --> src/main.rs:6:22
   |
5  |     let mut_1 = &mut owned[0];
   |                      ----- first mutable borrow occurs here
6  |     let mut_2 = &mut owned[1];
   |                      ^^^^^ second mutable borrow occurs here
...
10 |     let undefined = *mut_1 + *mut_2;
   |                     ------ first borrow later used here

error[E0505]: cannot move out of `owned` because it is borrowed
  --> src/main.rs:9:10
   |
5  |     let mut_1 = &mut owned[0];
   |                      ----- borrow of `owned` occurs here
...
9  |     drop(owned);
   |          ^^^^^ move out of `owned` occurs here
10 |     let undefined = *mut_1 + *mut_2;
   |                     ------ borrow later used here

Some errors have detailed explanations: E0499, E0505.
For more information about an error, try `rustc --explain E0499`.
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/rustnoerror`
1511396695
```
{{<rawhtml>}}<br>{{</rawhtml>}}

Again, it just outputs garbage data.

Here are the _fun_ ways our patched compiler handles various error conditions:

- Many result in an internal compiler error since codegen assumes that other parts of the compiler did their job
- If you have non-exhaustive patterns the compiler tries to execute an illegal instruction and coredumps
- Sometimes format strings that reference variables affected by errors cause an ICE, so you effectively have to always do `std::io::stdout().write_all(...)` instead of `println!`

Please remember not to use this for anything other than testing!
