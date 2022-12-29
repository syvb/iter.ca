+++
Title = "AlpID specification"
+++

AlpID is a [binary-to-text encoding](https://en.wikipedia.org/wiki/Binary-to-text_encoding) for identifiers that only uses the 22 unambiguous characters of the Latin alphabet (`B`, `I`, `L`, and `O` are omitted).

## 1: Format

### 1.1: Prefix

AlpIDs are have a prefix specfic to their use case. For example, Acme Inc. might choose `ACME` as their prefix. Prefixes are followed by a hypen (`-`).

### 1.2: Counter

The counter portion represents a monotonically increasing value.

### 1.2.1: Converting counter values to AlpIDs

#### 1.2.1.1: Algorithm
The AlpID alphabet is `ACDEFGHJKMNPQRSTUVWXYZ`.

This process produces the AlpID counter portion in <i>str</i> (which is initially empty) from a number, <i>n</i>.
<ol class="spec-list">
    <li data-prefix="1.2.1.1">Set <i>idx</i> to <i>n</i> modulo 22.</li>
    <li data-prefix="1.2.1.1">Prepend the <i>idx</i>th character of the AlpID alphabet to <i>str</i>.</li>
    <li data-prefix="1.2.1.1">Set <i>n</i> to floor(n ÷ 22).</li>
    <li data-prefix="1.2.1.1">If <i>n</i> is 0, stop.</li>
    <li data-prefix="1.2.1.1">Go to step 1.2.1.1.1.</li>
</ol>

#### 1.2.1.2: Example implementation

In JavaScript:

```js
const ALPHABET = "ACDEFGHJKMNPQRSTUVWXYZ";
function toAlpIdCounter(n) {
  let str = "";
  do {
    str = ALPHABET[n % ALPHABET.length] + str;
    n = Math.floor(n / ALPHABET.length);
  } while (n !== 0)
  return str;
}
toAlpIdCounter(50) // -> DH
```

## 2: Example AlpIDs

|AlpID|Counter value|
|-|-|
|`ACME-A`  |0|
|`ACME-C`  |1|
|`ACME-FQ` |100|
|`ACME-YSQ`|1000|

## 3: Resources

Send feedback on AlpID to alpid@iter.ca.
