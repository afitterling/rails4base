require File.expand_path('../boot', __FILE__)

require 'rails/all'

# load the application.yml which is specific to each installation instance!
# see: http://stackoverflow.com/questions/7072986/rails-load-yaml-to-hash-and-reference-by-symbol
APP_CONFIG = HashWithIndifferentAccess.new(
    YAML.load(File.read(File.expand_path('../application.yml', __FILE__)))
)

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    #config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')

  end
end
