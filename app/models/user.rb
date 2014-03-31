class User < ActiveRecord::Base
  include Clearance::User

  has_many :songs

  def has_dropbox_token?
    return !self.dropbox_token.blank?
  end
end
