#!/bin/bash

set -e

convert maxres.png maxres.png # fix checksum
zopflipng -m maxres.png maxrescomp.png

function mk {
    convert maxres.png -resize $1x$1 raw$1.png
    zopflipng -m raw$1.png a$1.png
    rm raw$1.png
}

mk 32
mk 500
mk 1000
mk 128
mk 256
mk 64
mk 32
mk 160
