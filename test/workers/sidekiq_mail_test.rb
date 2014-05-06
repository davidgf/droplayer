require 'test_helper'
require 'sidekiq/testing'

class SidekiqMailTest < ActiveSupport::TestCase     

    test "should get first chunk of mp3 file" do
        u = User.first
        ClearanceMailer.delay.change_password u
        puts Sidekiq::Extensions::DelayedMailer.jobs
    end

end