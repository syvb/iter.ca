+++
date = "2022-03-09T00:00:00Z"
description = "ASCII control characters are quite useful"
tags = ["ascii", "programming"]
title = "Writing semantic ASCII"
+++

In the [ASCII](https://en.wikipedia.org/wiki/ASCII) character set (and Unicode, where the first 128 characters are the same as ASCII), there are [32 non-printable control characters](https://en.wikipedia.org/wiki/C0_and_C1_control_codes#Basic_ASCII_control_codes). Many of those control characters aren't very useful in a modern context, such as *Acknowledge*, which isn't very useful since modern communication protocols handle acknowledgements at a higher level.

But some of those characters are useful! I'm going to call writing ASCII that takes advantage of control characters *Semantic ASCII* (like [Semantic HTML](https://en.wikipedia.org/wiki/Semantic_HTML)) because it makes it sound cool.

The most useful control characters are *File Separator*/*Group Separator*/*Record Separator*/*Unit Separator*, which can be used to delimit data in a structured file. *Unit Separator* is the CSV/TSV equivalent of a space/tab, and *Record Separator* is the equivalent of a newline. The ASCII way of structuring data works better than CSV/TSV: it can handle newlines/commas/tabs in data without the need for quoting or escaping, and instead of representing a 2D matrix, ASCII can represent a 4D tensor!

For example, to represent data about countries and their political subdivisions, and the populations and founding date of these places we can use these characters (leading whitespace is just for visual clarity here):

<!-- continent -> country -> city  -->
<!-- <FS> <GS> <RS> <US> -->

```
Canada
  <GS>38246108
  <GS>1867-07-01
  <GS>
    Newfoundland
      <US>521542
      <US>1949-03-31
    <RS>Ontario
      <US>14826276
      <US>1867-07-01
<FS>United States
  <GS>334262970
  <GS>1776-07-04
  <GS>
    Maine
      <US>1344212
      <US>1820-03-05
    <RS>North Dakota
      <US>762062
      <US>1889-11-02
```

It would have been great if this format had become the *de facto* way of storing spreadsheets, instead of CSV, which gets quite complicated to parse correctly when you need to start handling commas and newlines within cells. Alas, CSV is what we are stuck with.

Another useful character is *Form Feed*, which is supposed to function as a page break when the document is printed. It doesn't get much use today, probably due to poor support, but some older documents use it, including some RFCs and GPL license versions.

More cool characters: *Start of Heading*, *Start of Text*, and *End of Text* can be used as a basic way of specifying headings in a document in pure ASCII, for primitive (and rarely supported) text formatting.
