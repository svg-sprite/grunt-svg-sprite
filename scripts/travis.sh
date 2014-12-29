#!/usr/bin/env bash

ORIG_PWD=$(pwd)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname $SCRIPT_DIR)"
cd "$ROOT_DIR"

$SCRIPT_DIR/coverage.sh
STATUS=$?
$SCRIPT_DIR/coveralls.sh

cd "$ORIG_PWD"

exit $STATUS