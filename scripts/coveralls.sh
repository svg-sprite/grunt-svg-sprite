#!/usr/bin/env bash

ORIG_PWD=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname $SCRIPT_DIR)"
cd "$ROOT_DIR"

cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js

cd "$ORIG_PWD"

exit 0