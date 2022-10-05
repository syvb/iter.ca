+++
date = "2022-05-08T00:00:00Z"
description = "Google Sheets has several interesting undocumented functions"
tags = ["programming", "google"]
title = "Undocumented Google Sheets formula functions"
toc = 1
+++

{{<rawhtml>}}<br>{{</rawhtml>}}
[Google Sheets](https://www.google.com/sheets/about/) has several functions that can be used in formulas. By looking at the source code, we can find a list of all available formula functions. By diffing that against [the list of formula functions in the documentation](https://support.google.com/docs/table/25273), we can get a list of undocumented functions.

The reason for not documenting these functions varies, but I've made some arbitrary guesses as to what's going on with these functions.

All of these are called in the normal way: by writing something like `=DEBUG_THROW_ERROR()` or `=UNARY_PLUS("3")` into a cell.

I find these undocumented functions (and the reasons for that) weirdly interesting. I hope you do too!

## Debugging functions
The code that references the names of these functions is nested deep in the formula evaluation process -- I missed these the first time I looked for undocumented formulas. Here they are:

- `DEBUG_THROW_ERROR` throws an error when evaluated, and results in a popup saying
  > There was an error during calculation. Some formulae may not be calculated successfully. Undo your last change and try again.
  
  There is a screen-covering modal dialog after you do this, so the only way to fix a spreadsheet that has this function in it is to delete the relevant cell before formula evaluation starts after loading the page.
- `DEBUG_TOKEN_INDEX` returns the index of the formula token that calls the function
- `DEBUG_CONDITIONAL` takes a cell range and returns nothing
- `DEBUG_OPTIONAL_RANGE_REF` optionally takes a cell range and returns a number

## Easter eggs
A few functions appear to be easter eggs:
- `WHATTHEFOXSAY` returns a random thing that foxes say, [and actually has some use cases](https://stackoverflow.com/a/66201717/10113238)
- `COINFLIP` is randomly either `TRUE` or `FALSE`. It appears to only recalculate once per spreadsheet modification, unlike `RAND`.
- `CURSORPARK` provides a nice [cursor park](https://twitter.com/ahl/status/1420886709974097921):
    <style>.sheetcell {tab-size: 4;}</style><div class="sheetcell">
    ```
    🌳	🌳	🌳	🌳	🌳	🌳	🌳	🌳
    🌳	 	 	  	🐝 	  	🐌	🌳
    🌳	 	🐇	  	  	  	  	🌳
    🌳	🌻	 	  	  	  	🐑	🌳
    🌳	🌳	🌳	🌳	🌳	🌳	🌳	🌳
    ```
    </div>
- `DUCKHUNT` results in a duck emoji: 🦆
- `RITZCODERZ` and `TRIXTERNS` list people who presumably worked on Google Sheets: trix is the codename for Google Sheets (maTRIX), and I think ritz is the codename for the [2013 rewrite](https://www.youtube.com/watch?v=9AyoRkr4I3U).

## Lambdas
`BYCOL`, `BYROW`, `CALL`, `CONTINUE.LEGACY`, `LAMBDA`, `MAKEARRAY`, `MAP`, `REDUCE`, `SINGLE`, `SCAN`

Excel [has support for lambda functions](https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67), and it seems that Google Sheets may soon also gain support for them! Currently, they are treated as if they don't exist if you type them in (there is probably a flag that the Sheets developers can set to test them). At one point these functions [accidentally had in-editor documentation](https://stackoverflow.com/q/69355989/10113238).

## Legacy functions
`AND.LEGACY`, `COUNTA.LEGACY`, `COUNTIF.LEGACY`, `DAY.LEGACY`, `HOUR.LEGACY`, `MATCH.LEGACY`, `MEDIAN.LEGACY`, `MINUTE.LEGACY`, `MMULT.LEGACY`, `MONTH.LEGACY`, `OR.LEGACY`, `ROUND.LEGACY`, `SECOND.LEGACY`, `SUMIF.LEGACY`, `SUM.LEGACY`, `TEXT.LEGACY`, `VLOOKUP.LEGACY`, `YEAR.LEGACY`

These are variants of documented formulas, but with `.LEGACY` appended. The legacy variants of boolean functions treat all strings as falsey, while the normal variants automatically parse `"true"`/`"false"` into boolean values. Perhaps an earlier version of Sheets had the wrong behaviour, and there's some logic to convert old calls to these functions to the legacy versions?

## Variant versions
`ISDATE_STRICT`, `ISDATETIME_STRICT`, `ISTIME_STRICT`, and `STDEV.INEXACT` are all variants of their main functions. Probably for the same reasons as the `*.LEGACY` functions?

## Unimplemented Excel compatibility
`CUBEKPIMEMBER`, `CUBEMEMBER`, `CUBEMEMBERPROPERTY`, `CUBERANKEDMEMBER`, `CUBESET`, `CUBESETCOUNT`, `CUBEVALUE`, `FIELDVALUE`, `INFO`, `NOEXPAND`, `REGISTER.ID`, `RTD`, `WEBSERVICE`

These formulas are treated as not existing, except the error message is different:
> This function is not fully supported in Sheets. Please see the help centre for more information.

Despite what that error might imply, these functions are not supported *at all*. I think this is just to give a better error message for imported Excel files with unsupported formulas.

## Conditions
`CONDITION_BLANK`, `CONDITION_BLANK.INEXACT`, `CONDITION_EQ`, `CONDITION_LT`, `CONDITION_LT.INEXACT`, `CONDITION_NE`, `CONDITION_ONE_OF_RANGE`, `CONDITION_ONE_OF_RANGE.INEXACT`, and `CONDITION_TEXT_EQ`
are used internally when applying conditional formatting and data validation, where the "Format cells if..." input allows either using a custom formula or selecting a comparison option from a menu. These functions are used to implement this.

`CONDITION_FLATTEN` and`CONDITION_GRADIENT` are used internally for conditional formatting gradients.

## Replaced functions
These functions are treated as not existing, except the error message is:
> The X function has been replaced with the Y function.

`GOOGLECLOCK` used to return the time on Google's servers, but the suggested replacement `NOW` returns the time on the current system. Perhaps Google thought that supporting `GOOGLECLOCK` wasn't worth it when `NOW` is usually good enough?

`GOOGLEREADER` presumably did something to do with Google Reader, before Reader was shut down. The suggested replacement is `IMPORTFEED`.

## Internal
`ARRAY_LITERAL` and `ARRAY_ROW` are used internally to transform array syntax (like `{1,2,3}`) into function calls.

`ARRAY_LITERAL` gets a passing mention in a [2013 video introducing the new Google sheets](https://youtu.be/9AyoRkr4I3U?t=57) (probably by accident), but has no other documentation.

## Not yet implemented
With `XLOOKUP` and `XMATCH`, if you provide the wrong number of arguments it gives an error complaining about the wrong number of arguments, but if you provide the right number it claims the function doesn't exist. This is probably because they are currently partially implemented versions of their Excel counterparts.

## Unknown
`UNARY_{PLUS,MINUS}` function the same as the documented function `U{PLUS,MINUS}`. I don't know why they exist. At first I thought they were internally used to implement unary prefixes in formulas like `=+("5")`, but that gets translated to a call to `UPLUS` (which *is* documented) internally.

## Accidentally undocumented
`BAHTTEXT`, `BINOM.DIST.RANGE`, `COUNTUNIQUEIFS`, and `PERCENTIF` are all fairly normal functions, and all have documentation shown when typing the function into the formula input, but aren't listed in [the list in the documentation](https://support.google.com/docs/table/25273). They *do* have documentation pages that are linked to from that list though. The exclusion from the list of formulas seems to be an oversight.

`REFERENCE` is entirely undocumented, for reasons unbeknownst to me. You can use it to get all the cells in a specified range. It's redundant to the documented `ARRAYFORMULA` function: `REFERENCE(A1, B2)` is the same as `ARRAYFORMULA(A1:B2)`. Excel doesn't appear to have a similar function.

## Bonus: foreign languages
A lesser known feature (but documented) of Sheets and Excel that I found while writing this is that there is support for localized formulas for some languages. You can write `=KÜRZEN(5.5)` (make sure to put the umlaut on the Ü) instead of `=TRUNC(5.5)` if you prefer to write your spreadsheets in German.
