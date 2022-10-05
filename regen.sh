#!/bin/bash
cd build-data/get || exit
./all.sh > ../../data/data.json
cd ../.. || exit
