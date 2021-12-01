#!/bin/sh
node shared-names.js > shared-names.dot
fdp -Tsvg shared-names.dot > shared-names.svg
