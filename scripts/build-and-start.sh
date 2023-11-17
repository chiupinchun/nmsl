#!/bin/bash
cd /home/nmsl/backend
# yarn build
if pm2 list | grep -q "backend"; then
    pm2 stop backend
    pm2 delete backend
fi
pm2 start --name backend dist/main.js --update-env
