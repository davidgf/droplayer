# Load the Rails application.
require File.expand_path('../application', __FILE__)

require 'yaml'
APP_CONFIG = YAML.load(File.read(Rails.root.join("config/app_config.yml")))
# Initialize the Rails application.
Droplayer::Application.initialize!
