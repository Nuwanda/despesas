#!/bin/bash
cd dist
python -m http.server 5000 &> /dev/null &
cd ..
webpack -d --watch

trap "exit" INT TERM
trap "kill 0" EXIT
