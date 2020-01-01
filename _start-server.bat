@echo off
title Private Box by BCMC: Local Development Server (localhost:3000)
call npm i -g nodemon
call npm i
if "%1"=="dev" (
	nodemon
) else (
	npm start
)