@echo off
title Private Box by BCMC: Local Development Client and Server (localhost:3000)
call npm i -g nodemon
call npm i
nodemon -i docs index.js --dev
