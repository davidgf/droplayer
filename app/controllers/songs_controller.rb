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
        songs_list = client.search '/', 'mp3'
        media_share = []
        # uri = "https://api-content.dropbox.com/1/files/sandbox"
        @songs = songs_list.map {|attr|
          if not attr["is_dir"]
            resp = client.get_file_chunk(attr["path"])
            id3 = StringIO.new(resp)
            Mp3Info.open(id3) do |mp3|
              puts attr["path"]
              puts '==========================title'
              puts mp3.hastag1?
              puts mp3.hastag2?
              if not mp3.tag.empty?
                attr['artist'] = mp3.tag.artist
                attr['title'] = mp3.tag.title
              end
              puts mp3.tag.title
              puts mp3.tag.artist
            end
            Song.new(attr)
          end
        }
              
      respond_to do |format|
        format.html
        # format.html { render :text => '<pre>'+JSON.pretty_generate(songs_list)+'</pre>' }
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
