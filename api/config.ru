require 'rubygems'
require 'bundler/setup'
require 'open-uri'

Bundler.require

set :public_folder, 'public'

require './app.rb'

run Sinatra::Application

