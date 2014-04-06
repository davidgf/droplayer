require 'test_helper'
require 'songs_data_worker'

class SongsDataWorkerTest < ActiveSupport::TestCase

    def setup
        @song_data_worker = SongsDataWorker.new
    end        

    test "should get first chunk of mp3 file" do
        song = songs(:wolf1)
        dropbox_client = @song_data_worker.get_dropbox_client(song.user)
        mp3_head = @song_data_worker.get_mp3_head(dropbox_client, song.path)
        assert_equal(10001, mp3_head.size)
    end

    test "should get correct mp3 info" do
        song = songs(:wolf1)
        dropbox_client = @song_data_worker.get_dropbox_client(song.user)
        artist, title, album, genre = @song_data_worker.get_mp3_info(dropbox_client, song.path)
        assert_equal(song.artist, artist)
        assert_equal(song.title, title)
        assert_equal(song.album, album)
        assert_equal(song.genre, genre)
    end

    test "should save mp3 info" do
        song_attributes = ["artist", "title", "album"]
        song_no_data = songs(:no_data)
        song_with_data = songs(:has_data)
        song_attributes.each do |a|
            assert(song_no_data.attributes[a].blank?)
            assert(song_with_data.attributes[a].blank?)
        end
        @song_data_worker.perform song_no_data.user_id
        song_with_data = Song.find(song_with_data.path_md5)
        song_no_data = Song.find(song_no_data.path_md5)
        song_attributes.each do |a|
            assert(song_no_data.attributes[a].blank?, "It shouldn't have any data")
            assert_not(song_with_data.attributes[a].blank?, "Attribute #{a} should have data (#{song_with_data.attributes[a]})")
        end
    end

end