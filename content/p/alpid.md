+++
Title = "AlpID specification"
+++

## 0: Introduction

An AlpID represents a non-negative integral value. It is a [binary-to-text encoding](https://en.wikipedia.org/wiki/Binary-to-text_encoding) for numbers that only uses the 22 unambiguous characters of the Latin alphabet (`B`, `I`, `L`, and `O` are omitted). AlpIDs sort in the same order as the integers they represent.

In this document, all indexing is zero-indexed.

## 1: AlpID format

AlpIDs encode non-negative integral values as base 22 numbers written in the AlpID alphabet. The AlpID alphabet is `ACDEFGHJKMNPQRSTUVWXYZ`.
The AlpID alphabet excludes 4 letters:
|Letter|Reason|
|-|-|
|`B`|Similar to `8`|
|`I`|Similar to `L` when lowercase|
|`L`|Similar to `I` when lowercase|
|`O`|Similar to `0`|

The canonical form of an AlpID is all uppercase.
It is valid for an AlpID to be written with lowercase letters.
Implementations must reject AlpIDs that contain characters outside of the AlpID alphabet.

## 2: Converting integers to AlpIDs

### 2.1: Algorithm

This process produces the AlpID in <i>str</i> (which is initially empty) from a number, <i>n</i>.
<ol class="spec-list">
    <li data-prefix="2.1">Set <i>idx</i> to <i>n</i> modulo 22.</li>
    <li data-prefix="2.1">Prepend the <i>idx</i>th character of the AlpID alphabet to <i>str</i>.</li>
    <li data-prefix="2.1">Set <i>n</i> to floor(<i>n</i> ÷ 22).</li>
    <li data-prefix="2.1">If <i>n</i> is 0, stop.</li>
    <li data-prefix="2.1">Go to step 2.1.1.</li>
</ol>

### 2.2: Example implementation

In JavaScript:

```js
const ALPHABET = "ACDEFGHJKMNPQRSTUVWXYZ";
function toAlpId(n) {
  let str = "";
  do {
    str = ALPHABET[n % ALPHABET.length] + str;
    n = Math.floor(n / ALPHABET.length);
  } while (n !== 0)
  return str;
}
toAlpId(50) // -> DH
```

## 3: Converting AlpIDs to integers

### 3.1: Algorithm

This process produces the integral value of an AlpId, <i>str</i>, in <i>n</i>.

<ol class="spec-list">
    <li data-prefix="3.1">Set <i>n</i> and <i>idx</i> to 0.</li>
    <li data-prefix="3.1">Reverse <i>str</i>.</li>
    <li data-prefix="3.1">Set <i>value</i> to the index of the character of the AlpID alphabet that corresponds to the <i>idx</i>th character of <i>str</i> (case-insensitively).</li>
    <li data-prefix="3.1">Add <i>value</i> × (22<sup><i>idx</i></sup>) to <i>n</i>.</li>
    <li data-prefix="3.1">If <i>idx</i> equals the length of <i>str</i>, stop.</li>
    <li data-prefix="3.1">Add 1 to <i>idx</i>.</li>
    <li data-prefix="3.1">Go to step 3.1.3.</li>
</ol>

### 3.2: Example implementation

```js
const ALPHABET = "ACDEFGHJKMNPQRSTUVWXYZ";
function parseAlpId(s) {
  s = s.toUpperCase();
  const values = s.split("").reverse().map(l => ALPHABET.indexOf(l));
  if (!values.every(value => value !== -1)) throw new Error("not an AlpID");
  
  return values
    .map((value, idx) => value * (ALPHABET.length ** idx))
    .reduce((a, b) => a + b);
}
parseAlpId("FDY") // -> 2000
```

## 4: Example AlpIDs

|AlpID  |Value    |
|-------|---------|
|A      |0        |
|C      |1        |
|FQ     |100      |
|DCN    |1000     |
|FQDYMT |23456789 |

## 5: Resources

Send feedback on AlpID to alpid@iter.ca.
