+++
date = "2019-02-06T05:00:00+00:00"
description = "A overview of how to use a cstringArray in Nim."
tags = ["nim", "tutorial", "programming"]
title = "Nim: How to use a cstringArray"
titlle = "How to use a cstringArray in Nim"

+++
The Nim system module (which is automatically into every Nim file) has a `cstringArray` type. However, it's usage is a bit tricky to figure out, and there's really no point in using for normal use. It's really only useful for interfacing with C/C++/Objective-C libraries and wrappers.

`cstringArray`s are created by using the `allocCStringArray` proc in the system module. You **must** pass in a Nim `openArray` as the starting point of the cstringArray. If you want to start from a blank state, pass in a empty array:

```nim
var array = allocCStringArray([])
array[0] = "foo" # array is now ["foo"]

var invalidArray = allocCStringArray() # results in error
```

You can also start from an existing `openArray`:

```nim
var array = allocCStringArray(["bar"]) # array is ["bar"]
array[1] = "baz" # array is ["bar", "baz"]
array[0] = "quz" # array is ["qux", "baz"]
```

The easiest way to loop over the elements of a `cstringArray` is to convert it to a `seq`, and loop over that. Because Nim doesn't keep track of the length of a `cstringArray`, you have to keep track of that some other way. Make sure you get the length right. If it's too small, you won't loop over all the elements. Too big, and you'll results that can vary wildly: you might get empty strings, random data, or even crashes if you try to read past the end of the `cstringArray`.

```nim
var array = allocCStringArray(["corge", "waldo"])

for ele in cstringArrayToSeq(array, 2):
  echo ele # prints corge and waldo
  
for ele in cstringArrayToSeq(array, 1):
  echo ele # prints just corge
  
# DON'T DO THIS:
for ele in cstringArrayToSeq(array, 9999):
  echo ele # on my system, prints an error
  
# OR THIS:
for ele in cstringArrayToSeq(array, 3):
  echo ele # on my system, prints corge, waldo, then a blank line
```

Once you're done with a `cstringArray`, make sure you de-allocate it, as I don't think the GC does this for you automatically:

```nim
var array = allocCStringArray(["fred", "garply"])
deallocCStringArray(array)
```