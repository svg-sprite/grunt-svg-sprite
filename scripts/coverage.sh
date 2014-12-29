#!/usr/bin/env bash

ORIG_PWD=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname $SCRIPT_DIR)"
cd "$ROOT_DIR"

# TODO: don't include running `grunt` in the coverage... This test suite shouldn't
# call the grunt stuff!
istanbul cover grunt -- test
STATUS=$?
cd "$ORIG_PWD"

exit $STATUS