#!/usr/bin/env sh

# Fail immediately if any linter fails
set -e

# Use this script's location as a reference point to determine filepaths
script_dir="$(dirname "$(realpath "$0")")"

# Execute the rest of this script from the prototype root directory
cd $script_dir/..

# Run the linters
npx eslint --ext .ts --ext .tsx --ext .js ./src
npx tsc --noemit
