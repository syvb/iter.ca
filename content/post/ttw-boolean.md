+++
date = "2021-03-15T05:00:00Z"
publishDate = "2021-03-15T05:00:00Z"
description = ""
tags = ["internet", "programming", "ttw", "rust"]
title = "Writing a boolean expression parser in Rust"
+++

While using my time tracking system, [TagTime Web](https://ttw.smitop.com/), I have on a few occasions wanted to use some complex logic to select pings across my database. My first implementation of this just had a simple way to include and exclude pings, but this later proved to be insufficent for my needs. I considered implementing a more complex system at first, but I decided it was a good idea to wait until the need actually arised before building a more complex system like this. Here, I will explain how I implemented this new system.

Here are some example queries, each with different syntax, demonstrate the range of ways queries can be formulated:
- To find time I'm distracted on social media, I can use a query like `distracted and (hn or twitter or fb)`
- To find time I'm programming something other than TagTime Web, I can do `code & !ttw`
- To find time I'm using GitHub but *not* for programming or working on TagTime Web, I can do `gh AND !(code OR ttw)`

My main goal with the query design was to make it very simple to understand how querying works -- I didn't want to make users read a long document before writing simple queries. I also wanted to write it in [Rust](https://www.rust-lang.org/), because I like Rust. It can be run in the browser via [WebAssembly](https://webassembly.org/), and since I was running WASM in the browser already I wasn't going to lose any more browser support than I already have. Rust is also pretty fast, which is a good thing, especially on devices with less computing power like phones (although I don't think it made much of a difference in this case).

Let's dive in to the code. It's open source, so you can follow along with [the source code](https://github.com/Smittyvb/ttw/blob/master/taglogic/src/bool.rs) if you want. I won't go over every line of code, but I will explain all of the important parts. There are three main phases in the system: lexing, parsing, and evaluation.

### Lexing
In the [lexing phase](https://en.wikipedia.org/wiki/Lexical_analysis), we convert raw text to a series of tokens that are easier to deal with. In this phase, different syntaxical ways to write the same thing will be merged. `&` and `and` will be repersented with the same token. Lexing won't do any validation that the provided tokens are sensical though: this phase is completely fine with unmatched brackets and operators without inputs. Here's what the interface is going to look like:
```rust
let tokens = lex("foo and !(bar | !baz)").unwrap();
assert_eq!(
    tokens,
    vec![
        Token::Name { text: "foo".to_string() },
        Token::BinaryOp(BinaryOp::And),
        Token::Invert,
        Token::OpenBracket,
        Token::Name { text: "bar".to_string() },
        Token::BinaryOp(BinaryOp::Or),
        Token::Invert,
        Token::Name { text: "baz".to_string() },
        Token::CloseBracket
    ]
);
```

Let's start implementing that. We'll start by defining what a token is:

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
enum Token {
    OpenBracket,
    CloseBracket,
    Invert,
    Name { text: String },
    BinaryOp(BinaryOp),
}
```

Instead of having two different tokens for `&`/`and` and `|`/`or`, I've created a [single `BinaryOp` token type](https://github.com/Smittyvb/ttw/blob/f77fa34e62739b0225847317d243fc1a4ab29b96/taglogic/src/bool.rs#L7-L11) since the two types of tokens can be treated the same in most cirumstances. It's just an `enum` with two variants:

```rust
#[derive(Debug, Copy, Clone, PartialEq, Eq)]
enum BinaryOp {
    And,
    Or,
}
```

I've also implemented a few helper methods: `from_char`, `as_char`, and `from_text` that will help with lexing. Now let's get on to actually lexing. We'll declare a `fn` that takes a `&str` and returns a `Vec<Token>`. We start out by defining the `ParseState` enum, inside `lex`:

```rust
fn lex(s: &str) -> Result<Vec<Token>, &'static str> {
    #[derive(Debug, Copy, Clone, Eq, PartialEq)]
    enum ParseState {
        /// Ready for any tokens.
        AnyExpected,
        /// In a name.
        InName,
        /// In a binary operation repersented with symbols.
        InSymbolBinOp(BinaryOp),
    }

    let mut state = ParseState::AnyExpected;
    let mut tokens = Vec::new();
    let mut cur_name = String::new();
```

Did you know that you can define an `enum` inside a `fn`? This is pretty neat: it allows you to define an `enum` that's only available inside the `fn` that defined it, which helps prevent implementation details from being exposed and used in other places. We'll use this throughout lexing to keep track of what we're currently looking at. Next, we'll break up the input string into individual UTF-8 characters, and loop over them:

```rust
for c in s.chars() {
```

Okay, time for the fun part: let's build tokens out of these characters. I've added enough comments for it to be fairly self-descriptive:

```rust
// the last token was "|" or "&", which has some special logic
if let ParseState::InSymbolBinOp(op) = state {
    state = ParseState::AnyExpected; // only do this for the immediate next char
    if c == op.as_char() {
        // treat "|" and "||" the same way
        continue;
    }
}

if state == ParseState::InName {
    let end_cur_token = match c {
        // stop parsing a tag as soon as we see a character starting a operator
        '(' | ')' | '!' => true,
        _ if BinaryOp::from_char(c) != None => true,

        _ if c.is_whitespace() => true, // whitespace also ends a tag
        
        _ => false,
    };
    if end_cur_token {
        let lower = cur_name.to_ascii_lowercase(); // tags are case insensitive

        if let Some(op) = BinaryOp::from_text(&lower) {
            // append the token
            tokens.push(Token::BinaryOp(op));
        } else {
            // the token is "and" or "or", so treat it like a binary operation
            tokens.push(Token::Name { text: cur_name });
        }

        cur_name = String::new(); // reset the current tag
        
        state = ParseState::AnyExpected; // anything could occur next
    } else {
        // not ending the current token, so add this character to the current tag
        cur_name.push(c);
    }
}

// any token could happen!
if state == ParseState::AnyExpected {
    let op = BinaryOp::from_char(c); // try to make a binary op out of the token
    match c {
        _ if op != None => {
            // we managed to create a binary operation
            tokens.push(Token::BinaryOp(op.unwrap()));
            state = ParseState::InSymbolBinOp(op.unwrap());
        }

        // operators
        '(' => tokens.push(Token::OpenBracket),
        ')' => tokens.push(Token::CloseBracket),
        '!' => tokens.push(Token::Invert),

        // ignore whitespace
        _ if c.is_whitespace() => {}
        
        // didn't start anything else, so we must be starting a tag
        _ => {
            state = ParseState::InName;
            cur_name = String::with_capacity(1);
            cur_name.push(c);
        }
    }
}
```

Finally, we check if there is any remaining tag tag info and return the tokens:

```rust
if !cur_name.is_empty() {
    let lower = cur_name.to_ascii_lowercase();
    if let Some(op) = BinaryOp::from_text(&lower) {
        tokens.push(Token::BinaryOp(op));
    } else {
        tokens.push(Token::Name { text: cur_name });
    }
}
tokens
```

### Parsing
Here, we'll take the stream of tokens and build it into an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST). This will repersent the expression in a way that's easy to evaluate. Here's the definition:

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
enum AstNode {
    /// The `!` operator
    Invert(Box<AstNode>),
    /// A binary operation
    Binary(BinaryOp, Box<AstNode>, Box<AstNode>),
    /// A name
    Name(String),
}
```

We use `Box` to indirectly point to other AstNodes and prevent infinite recursion errors. The important `fn` here is `munch_tokens`, which takes a list of tokens and converts it to a `AstNode`.

Notice that if there was an error parsing a statically defined string is returned. Most lexers/parsers would include more detailled information here about where the error occured, but to reduce complexity I haven't implemented any such logic.

### Evaluation
Thanks to the way `AstNode` is written, evaluating `AstNode`s against some tags is easy:
```rust
impl AstNode {
    fn matches(&self, tags: &[&str]) -> bool {
        match self {
            Self::Invert(inverted) => !inverted.matches(tags),
            Self::Name(name) => tags.contains(&&**name),
            Self::Binary(BinaryOp::And, a1, a2) => a1.matches(tags) && a2.matches(tags),
            Self::Binary(BinaryOp::Or, a1, a2) => a1.matches(tags) || a2.matches(tags),
        }
    }
}
```

The only weird thing here is `&&**name`, which looks really weird but is the right combination of symbols needed to convert a `&String` to a `&&str` (it goes `&String` -> `String` -> `str` -> `&str` -> `&&str`).

### Putting it all together
We don't want to expose all of these implementation details to users. Let's wrap all of this behind a struct that takes care of calling the lexer and building an AST for our users. If we decide to completly change our implementation in the future, nobody will know since we'll have a very small API surface.


That's it! If you want some more boolean expression content, check out the [test suite](https://github.com/Smittyvb/ttw/blob/f77fa34e62739b0225847317d243fc1a4ab29b96/taglogic/src/bool.rs#L271) for some more moderately interesting tests.
