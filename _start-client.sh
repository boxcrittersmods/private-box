echo off
gem install bundle
bundle install
bundle exec jekyll serve -t --config _config.yml,_config-dev.yml
