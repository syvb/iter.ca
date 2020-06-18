+++
date = "2019-09-30T04:00:00+00:00"
description = "A short tutorial on using private class variables in JavaScript."
tags = ["javascript", "programming", "tutorial"]
title = "How to use private JS class variables"

+++
# Private class variables in JavaScript

Private variables in JavaScript is gaining browser support. As I right this, it's supported in [\~63% of browsers](https://caniuse.com/#search=Private%20class%20fields). You can use the Babel plugin [@babel/plugin-proposal-class-properties](https://www.npmjs.com/package/@babel/plugin-proposal-class-properties) to transform it into cross-browser code, though. Let's take a look at how you can use private variables in ES6 classes.

## Private fields - basics

You can declare private fields in ES6 classes by prefixing the variable name with a `#`, like so:

```js
class Counter {
  #value = 0;
  increase() {
    this.#value++;
  }
  value() {
    return this.#value;
  }
}
```

This class repersents a counter with a value that can only be increased. Here's how you can use it:

```js
const c = new Counter;
c.increase();
c.increase();
c.increase();
console.assert(c.value() === 3);
```

You can't do any of these things, due to privacy rules which prevent any usage of private variables outside of the class declaration:

```js
const c = new Counter;
c.#value = 3; // can't do since not in a class function
c.decrease = () => this.#value--; // can't do since not in class declaration
```

## Private functions

You can make private functions too:

```js
class Computer {
  #bios =    function () { /* ... */ }
  #loadRam = function () { /* ... */ }
  #loadOs =  function () { /* ... */ }
  turnOn() {
    this.#bios();
    this.#loadRam();
    this.#loadOs();
  }
}
```

You can call the `turnOn` method, but you can't call `#bios`, `#loadRam`, or `#loadOs` by themselves. Private functions can also access private variables.

## Variable without inital value

You can avoid setting an intial value by omitting the `= ...` part:

```js
class Example {
  #private;
}
```

## Static private variables

You can set static private variables, which can be used by static functions of the class, private functions of the class, and non-static methods:

```js
class Example {
  static #password = "hunter1";
  
  // all of these functions return "hunter1"
  static #privateGetPassword = () => this.#password;
  static staticGetPassword() {
    return this.#password;
  }
  static privateGetPassword() {
    return this.#privateGetPassword();
  }
  getPassword() {
    return Example.#password;
  }
}
```

## Square bracket notation doesn't work

Confusingly, it's possible to have two private variables that start with `#` in a class. Private variables **cannot** be accessed with square bracket notation (e.g. `this['varName']`), but if you attempt to do so you'll be able to set a public variable that starts with `#`. This means that **you can have two variables with the same name**! Make sure you avoid square brackets when working with private variables, otherwise you'll get some hard-to-fix bugs.