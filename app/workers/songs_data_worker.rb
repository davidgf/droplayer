require "stringio"
require 'mp3info'

class SongsDataWorker
    include Sidekiq::Worker
  
    def perform(user_id)
        user = User.find(user_id)
        dropbox_client = get_dropbox_client(user)
        songs = user.songs.where(id3: false)
        songs.each do |song|
            save_id3_info(dropbox_client, song)
        end
    end

    def save_id3_info(dropbox_client, song)
        begin
            if !song.id3?
                artist, title, album, genre = get_mp3_info(dropbox_client, song.path)
                song.id3 = true
                song.artist = artist
                song.title = title
                song.album = album
                song.genre = genre
                song.save
            end
        rescue Mp3InfoError => e
            logger.error "#{song.path}: error getting id3 info"
            logger.error e
        end
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

    def get_dropbox_client(user)
        if user.has_dropbox_token?
            access_token = user.dropbox_token
            DropboxClient.new(access_token)
        end
    end
end