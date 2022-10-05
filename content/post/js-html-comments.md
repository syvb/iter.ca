+++
date = "2022-02-23T00:00:00Z"
description = "Some weird legacy behavior in JavaScript"
tags = ["programming", "javascript"]
title = "HTML comments work in JavaScript too"
+++

Here's some obscure trivia about JavaScript: you can use HTML comments in JavaScript. Not just in \<script\> tags: you can use them in included standalone files, and even in [Node.js](https://nodejs.org/en/) and [Deno](https://deno.land/). Syntax highlighters, on the other hand, do not have great support for this (the only one I've seen get this completely right is the one in the Firefox DevTools), so these snippets will show a bit weirdly on my blog. Here's what that looks like:

```js
// below statement logs 1
console.log(1); <!-- log 1 -->
<!-- above statement logs 1 -->
```
{{<rawhtml>}}<br>{{</rawhtml>}}

This is entirely a historical relic, and using this for anything other than experimentation is a Bad Idea. The original intent was to make it so that browsers without JavaScript support would ignore script blocks that were surrounded with HTML comments, instead of treating them as text (browsers treat unknown elements as `<span>`s). As such, HTML comments inside JavaScript were ignored. Such code blocks might look like this:
  
```html
<script>
  <!--
    // browsers without JavaScript support think this is all in a big comment,
    // and so don't render this as plain text
    alert("Hi!");
  -->
</script>
```
{{<rawhtml>}}<br>{{</rawhtml>}}

While there are no browsers made in the past two decades that display the contents of script tags (even when JavaScript is disabled), this behavior can't be removed from browsers since some websites rely on this. Eventually this behavior was added to [the ECMAScript spec](https://tc39.es/ecma262/#prod-annexB-Comment), as a legacy behavior that should only be implemented in browser-like environments. I'm not sure why Node and Deno support this: maybe V8 doesn't have any option to disable this?

The spec allows for a lot of interesting comment behavior. We can use `<!--` the same as `//` for a line comment, but `-->` only works at the start of a line. Unlike actual HTML comments, which are block comments, HTML-in-JS comments are always line comments.

```js
// Logs 1
console.log(1); // Logs 1

<!-- Logs 2
console.log(3); <!-- Logs 2

--> Logs 3
console.log(3);
```
{{<rawhtml>}}<br>{{</rawhtml>}}

The reason that `-->` is only allowed at the start of a line is because otherwise it would break [the "goes to" operator](https://stackoverflow.com/a/1642035/10113238) (decrement followed by greater than).

Some more useful comment-related trivia I learned is that a [shebang (`#!`)](https://en.wikipedia.org/wiki/Shebang_(Unix)) at the beginning of a file is also treated as a comment, even in (modern) web browsers.
