@echo off
title Private Box by BCMC: Local Development Client (localhost:4000)
call gem install bundle
call bundle install
call bundle exec jekyll serve -t --config _config.yml,_config-dev.yml