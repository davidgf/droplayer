require "stringio"
require 'mp3info'

class SongsDataWorker
    include Sidekiq::Worker
  
    def perform(user_id)
        puts "user id: #{user_id}"
        dropbox_client = get_dropbox_client(user_id)
    end

    def get_mp3_info(dropbox_client, song_path)
        mp3_file = get_mp3_head(dropbox_client, song_path)
        return get_id3_info(mp3_file)
    end

    def get_mp3_head(dropbox_client, song_path)
        resp = dropbox_client.get_file_chunk(song_path)
        return StringIO.new(resp)
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

    def get_dropbox_client(user_id)
        user = User.find(user_id)
        if user.has_dropbox_token?
            access_token = user.dropbox_token
            DropboxClient.new(access_token)
        end
    end
end