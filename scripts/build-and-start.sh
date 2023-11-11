#!/bin/bash
cd /home/nmsl/backend
yarn build
pm2 stop --name backend
pm2 start --name backend dist/main.js
