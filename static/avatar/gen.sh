#!/bin/bash
pngcrush maxres.png maxrescomp.png

function mk {
    convert maxres.png -resize $1x$1 a$1.png
    pngcrush a$1.png
    rm a$1.png
    mv {pngout,a$1}.png
}

mk 500
mk 1000
mk 128
mk 256
mk 64
mk 32
