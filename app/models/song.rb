require 'digest/md5'

class Song < ActiveRecord::Base

    self.primary_key = "path_md5"
    belongs_to :user
    validates :path, presence: true
    validates :path_md5, uniqueness: true
    before_validation :ensure_md5

private

    def ensure_md5
        if !self.path.blank? and self.path_md5.blank?
            self.path_md5 = Digest::MD5.digest("#{self.user_id}#{self.path}")
        end
    end
end
