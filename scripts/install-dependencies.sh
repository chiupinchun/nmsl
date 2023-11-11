#!/bin/bash

backup_path="/home/nmsl/patch-main"
main_path="/home/nmsl/main"

changes=$(diff "$backup_path/package.json" "$main_path/package.json")
if [ -n "$changes" ]; then
    cd "$main_path"
    yarn install
    rm -rf "$backup_path/package.json"
    cp "$main_path/package.json" "$backup_path/package.json"
else
    echo "No changes in package.json detected. Skipping yarn install."
fi
