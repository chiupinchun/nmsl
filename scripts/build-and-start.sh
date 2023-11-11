#!/bin/bash
cd /home/nmsl/backend
# yarn build
pm2 list | grep "backend" && pm2 restart backend || pm2 start --name backend dist/main.js
