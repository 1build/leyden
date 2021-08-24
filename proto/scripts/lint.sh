#!/usr/bin/env sh

# Fail immediately if any linter fails
set -e

# Using this script's location as a reference point to determine filepaths
script_dir="$(dirname "$(realpath "$0")")"

# Run linters from prototype root directory
cd $script_dir/..

npx eslint --ext .ts --ext .tsx --ext .js ./src
npx tsc --noemit
