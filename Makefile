#!/usr/bin/make

all:
	@nodemon -i docs ./index.js

dev:
	@nodemon -i docs ./index.js --dev

deps:
	@npm install -g nodemon
	@npm install
	
