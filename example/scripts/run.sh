#!/usr/bin/env sh

# Print commands as they run and fail immediately on any failure
set -xe

# Use this script's location as a reference point to determine filepaths
script_dir="$(dirname "$(realpath "$0")")"

# Run linters from prototype root directory
cd $script_dir/..

# Build docker image
docker build -t leyden/proto:1.0 .

# Run a dockerized command
docker run -v `pwd`:/mnt -p 8081:8081 -p 35729:35729 --network host -i leyden/proto:1.0 $@
