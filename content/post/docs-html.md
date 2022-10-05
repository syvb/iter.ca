+++
date = "2022-06-20T16:00:00Z"
description = "Google Sheets/Docs/Slides adds extra HTML markup when copying stuff to the clipboard"
tags = ["programming", "google"]
title = "Hidden HTML markup Google Sheets adds to the clipboard"
+++

Google [Docs](https://www.google.com/docs/about/)/[Sheets](https://www.google.com/sheets/about/)/[Slides](https://www.google.com/slides/about/)/[Drawings](https://support.google.com/docs/answer/179740?hl=en&co=GENIE.Platform%3DDesktop) (which all have a lot of code in common) all support copying content (such as text, images, spreadsheet cells, shapes, etc.) created in them to the clipboard and pasting it into another doc/sheet/slideshow/drawing, which might be different than the origin document. Content is copied to the clipboard as HTML, which means that hidden markup can be inserted here to support copying complex objects that can't easily be represented as ordinary HTML.

You can try pasting some HTML in this [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) box, and see what HTML gets pasted:

<style>
    #input {
        width: 50px;
        height: 50px;
        border: 2px solid black;
        overflow: hidden;
    }
    #output {
        white-space: pre-wrap;
        font-family: monospace;
        text-align: left;
    }
</style>
<div id="input" contenteditable></div>
<div id="output"><noscript>sorry, no JavaScript :(</noscript></div>
<script>
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const observer = new MutationObserver(update);
    observer.observe(input, { subtree: true, childList: true, attributes: true, characterData: true });
    function update() {
        output.textContent = input.innerHTML;
    }
</script>
<br>

For example, copying a smiley face shape to the clipboard results in this HTML:

```html
<span id="docs-internal-guid-7d347fee-7fff-afd7-ca79-41b3a53d7fad">&nbsp;</span>
```
{{<rawhtml>}}<br>{{</rawhtml>}}

The internal GUID `id` is used to keep track of the underlying data. You can copy and paste the shape within a document, and it'll know to duplicate the existing smiley face by looking up the GUID. This also works when pasting into another document in the same browser -- it stores the GUID ⇔ data mapping in the browser's local storage. Trying to paste it into another open browser just results in an empty text box being pasted, since the other browser doesn't have any data stored for the pasted GUID. GUID linking allows these Google apps to store more data on the clipboard than would otherwise be supported. 

Google Sheets takes a different approach than Docs/Slides/Drawings to storing additional data on the clipboard. In this example, the second column has a formula that doubles the first column (`=2*A1`) -- here's what that looks like when pasted:

<style type="text/css">
  .demotable td {
    border: 1px solid #ccc;
  }

  .demotable br {
    mso-data-placement: same-cell;
  }
</style>
<table
  class="demotable"
  dir="ltr"
  style="
    table-layout:fixed;font-size:10pt;font-family:Arial;
    width:0px;border-collapse:collapse;border:none
  "
  cellspacing="0"
  cellpadding="0"
  border="1"
>
  <colgroup>
    <col width="100">
    <col width="100">
  </colgroup>
  <tbody>
    <tr style="height:21px;">
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:3}"
      >3</td>
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:6}"
        data-sheets-formula="=2*R[0]C[-1]"
      >6</td>
    </tr>
    <!--<tr style="height:21px;">
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:5}"
      >5</td>
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:10}"
        data-sheets-formula="=2*R[0]C[-1]"
      >10</td>
    </tr>-->
  </tbody>
</table>
<br>

And here's the (formatted) HTML that gets copied to the clipboard:

```html
<style type="text/css">td { border: 1px solid #ccc; } br { mso-data-placement: same-cell; }</style>
<table
  style="
    table-layout:fixed;font-size:10pt;font-family:Arial;
    width:0px;border-collapse:collapse;border:none
  "
  dir="ltr" cellspacing="0" cellpadding="0" border="1"
>
  <colgroup>
    <col width="100">
    <col width="100">
  </colgroup>
  <tbody>
    <tr style="height:21px;">
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:3}"
      >3</td>
      <td
        style="
          overflow:hidden;padding:2px 3px 2px 3px;
          vertical-align:bottom;text-align:right;
        "
        data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:6}"
        data-sheets-formula="=2*R[0]C[-1]"
      >6</td>
    </tr>
  </tbody>
</table>
```
{{<rawhtml>}}<br>{{</rawhtml>}}

Instead of inserting an opaque GUID into the clipboard, Google Sheets takes a different approach: putting all the relevant data as `data-` attributes on the copied data. It uses the `data-sheets-value` and `data-sheets-formula` attributes to encode the data and formula of the cell.

For cells that have a value determined by a formula, `data-sheets-formula` contains that formula. Cells references (such as `A2`) are converted to relative references[^exact], such as `R[0]C[-1]` for the cell one column to the left[^indirect]. This format is different than the internal (unexposed) representation which represents cell contents as structured data. (fun fact: formulas are also internally stored in stack-based language that describes their execution; that formula gets stored as `LD2]R3]F*:2]S`)

[^exact]: Except for references like `$A$1`, where the dollar signs explicitly disable this behaviour. In that case it's stored as an absolute reference, such as `R3C2`.
[^indirect]: You can't use R1C1 notation when writing a formula directly in Sheets, pasting it in is the only way to use it (unlike Excel). However, `INDIRECT` does allow this notation when the second parameter is `FALSE`.

The `data-sheets-value` attribute is a JSON object containing the value in the cell. The `"1"` field has an integer containing the data type, and the other field has the field name of that integer, with a value corresponding to how types of that value are encoded. For example, the type for boolean values is `4`, so `FALSE` gets encoded as `{"1":4,"4":0}`. The textual representation of the value is separate from the actual value, and only the `data-sheets-value` attribute is checked when pasting in cells. The actual text content of the `<td>` element is ignored.

An odd consequence of the way values are stored is that if you copy cells from Google Sheets, edit them in an external HTML editor, then paste them back in, your modifications don't get reflected in the pasted cells. It also means that if you copy some text into an HTML editor, then change the text, the original text is still around in an attribute.

The `data-sheets-value` attribute was how I first noticed these attributes. I have a habit of looking at the raw sources of emails I receive, so I noticed when I received an HTML email with parts copied from a spreadsheet, with slightly different text in the `data-sheets-value` attribute than the body of the email. Be sure to keep in mind that the reader can see the originally pasted text when pasting from Google Sheets into an HTML document!
