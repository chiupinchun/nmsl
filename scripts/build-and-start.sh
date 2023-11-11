#!/bin/bash
cd /home/nmsl/main
# yarn build
pm2 list | grep "main" && pm2 restart main || pm2 start yarn --name "main" --interpreter bash -- start
