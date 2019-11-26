#!/usr/bin/make

all:
	@bundle exec jekyll serve -t --config _config.yml &
	@nodemon

dev:
	@bundle exec jekyll serve -t --config _config.yml,_config-dev.yml &
	@nodemon

deps:
	@gem install bundle
	@bundle install
	@npm install -g nodemon
	@npm install
	
