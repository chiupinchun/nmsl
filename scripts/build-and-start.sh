#!/bin/bash
cd /home/nmsl/main
# yarn build
if pm2 list | grep -q "main"; then
    pm2 stop main
    pm2 delete main
fi
pm2 start yarn --name "main" -- start
