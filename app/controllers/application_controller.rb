class ApplicationController < ActionController::Base
  include Clearance::Controller
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

    def get_dropbox_client
        if signed_in? and current_user.has_dropbox_token?
            begin
                access_token = current_user.dropbox_token
                DropboxClient.new(access_token)
            rescue
                # Maybe something's wrong with the access token?
                session.delete(:access_token)
                raise
            end
        end
    end

    def get_id3_info(mp3_file)
        Mp3Info.open(mp3_file) do |mp3|
          if not mp3.tag.empty?
            artist = mp3.tag.artist
            title = mp3.tag.title
            genre = mp3.tag.genre
            album = mp3.tag.album
          end
          return artist, title, album, genre
        end
    end
end
