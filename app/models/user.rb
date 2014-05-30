require 'digest/md5'

class User < ActiveRecord::Base
  include Clearance::User

  has_many :songs

  def has_dropbox_token?
    return !self.dropbox_token.blank?
  end

  def has_new_songs?(dropbox_songs_md5)
  	return self.songs_md5 != dropbox_songs_md5
  end
end
