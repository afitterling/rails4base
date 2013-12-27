source 'https://rubygems.org'

platforms :jruby do
  gem 'torquebox'
  gem 'torquebox-server'
  gem 'activerecord-jdbcsqlite3-adapter'
end

platforms :ruby do
  gem 'sqlite3'
end

gem 'rails', '4.0.0'
gem 'sass-rails', '~> 4.0.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 1.2'
gem 'devise' #, '~> 3.0.0'
gem 'rabl'
gem 'haml'
gem 'haml_coffee_assets'
gem 'cells'
gem 'bootstrap-sass'
gem 'acts_as_tree'
gem 'acts_as_list'
gem 'carrierwave'
gem 'mini_magick'

group :doc do
  gem 'sdoc', require: false
end

#group :production do
#  gem 'unicorn'
#end

group :development do
  gem 'zeus'
  gem 'guard'
  gem 'guard-minitest'
  
#  gem 'debugger'
#  gem 'debugger-completion'
  
  gem 'pry-rails'
  platform :ruby do
    gem 'thin'
  end
  gem 'webrick', '= 1.3.1'
  gem 'erb2haml'
end

group :development, :test do
  gem 'minitest-rails'
  gem 'minitest-spec-rails'
  gem 'fabrication'
  gem 'poltergeist' #, '~> 1.3.0'
end

group :test do
  gem 'minitest-rails-capybara'
  gem 'guard'
end

