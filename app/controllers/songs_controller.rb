require 'dropbox_sdk'
require "stringio"
require 'mp3info'
# This is an example of a Rails 3 controller that authorizes an application
# and then uploads a file to the user's Dropbox.

class SongsController < ApplicationController
    
    def index
        client = get_dropbox_client
        unless client
            redirect_to(:controller => 'dropbox', :action => 'auth_start') and return
        end
        # sync_songs client
        # current_user.songs.find_each do |song|
        #     save_id3_info(client, song)
        # end

        @songs = current_user.songs.to_a
              
        respond_to do |format|
            format.html
            format.json { render :json => @songs }
        end
    end
    
    def media_link
      if not params[:path] then
        @media = nil
      else
        client = get_dropbox_client
        begin
          @media = client.media(params[:path])
        rescue DropboxError
          @media = nil
        end
      end
      
      respond_to do |format|
        format.json { render :json => @media }
      end
    end

private

    def sync_songs(dropbox_client)
        songs_list = dropbox_client.search '/', 'mp3'
        songs_path = songs_list.map! {|song| song.slice("path")}
        current_user.songs.create(songs_path)
    end

    def save_id3_info(dropbox_client, song)
        begin
            if !song.id3?
                artist, title, album, genre = get_mp3_info(dropbox_client, song)
                song.id3 = true
                song.artist = artist
                song.title = title
                song.album = album
                song.genre = genre
                song.save
                puts "song #{song.path}", song.artist, song.title, song.album, song.genre
            end
        rescue Mp3InfoError => e
            logger.error "#{song.path}: error getting id3 info"
            logger.error e
        end
    end

    def get_mp3_info(dropbox_client, song)
        mp3_file = get_mp3_head(dropbox_client, song)
        return get_id3_info(mp3_file)
    end

    def get_mp3_head(dropbox_client, song)
        resp = dropbox_client.get_file_chunk(song.path)
        return StringIO.new(resp)
    end

end


class DropboxClient

    def get_file_chunk(from_path, size='10000', rev=nil)
        response = get_file_impl2(from_path, rev, size)
        Dropbox::parse_response(response, raw=true)
    end
    
    def get_file_impl2(from_path, rev=nil, size='1000') # :nodoc:
        headers = {'Range' => "bytes=0-#{size}"}
        path = "/files/#{@root}#{format_path(from_path)}"
        params = {
            'rev' => rev,
        }
        content_server = true
        @session.do_get2 path, params, headers, content_server
    end

    private :get_file_impl
end

class DropboxSessionBase

  def do_get2(path, params=nil, headers=nil, content_server=false)  # :nodoc:
    params ||= {}
    assert_authorized
    uri = build_url_with_params(path, params, content_server)
    req = Net::HTTP::Get.new(uri.request_uri)
    req.add_field(headers.keys[0], headers.values[0])
    do_http(uri, req)
  end

end
