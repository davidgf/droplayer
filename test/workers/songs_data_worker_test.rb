require 'test_helper'
require 'songs_data_worker'

class SongsDataWorkerTest < ActiveSupport::TestCase

    def setup
        @song_data_worker = SongsDataWorker.new
    end        

    test "should get first chunk of mp3 file" do
        song = songs(:wolf1)
        dropbox_client = @song_data_worker.get_dropbox_client(song.user_id)
        mp3_head = @song_data_worker.get_mp3_head(dropbox_client, song.path)
        assert_equal(10001, mp3_head.size)
    end

    test "should get correct mp3 info" do
        song = songs(:wolf1)
        dropbox_client = @song_data_worker.get_dropbox_client(song.user_id)
        artist, title, album, genre = @song_data_worker.get_mp3_info(dropbox_client, song.path)
        assert_equal(song.artist, artist)
        assert_equal(song.title, title)
        assert_equal(song.album, album)
        assert_equal(song.genre, genre)
    end

end