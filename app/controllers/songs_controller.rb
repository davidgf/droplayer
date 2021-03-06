require "stringio"
require 'mp3info'
# This is an example of a Rails 3 controller that authorizes an application
# and then uploads a file to the user's Dropbox.

class SongsController < ApplicationController
    before_filter :authorize
    
    def index
        client = get_dropbox_client
        unless client
            redirect_to(:controller => 'dropbox', :action => 'auth_start') and return
        end
        sync_songs client
        sons = current_user.songs
        @songs = current_user.songs.to_a
        @suggestion = Suggestion.new

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
        dropbox_songs_md5 = Digest::MD5.digest(songs_list.to_s)
        if current_user.has_new_songs?(dropbox_songs_md5) then
            current_user.update_attribute(:songs_md5, dropbox_songs_md5)
            songs_list.select! {|song| song.include?("mime_type") and song["mime_type"] == "audio/mpeg"}
            songs_list.map! {|song| song.slice("path")}
            songs_path_array = songs_list.map {|song| song["path"]}
            songs_to_remove = current_user.songs.where.not(path: songs_path_array)
            songs_to_remove.delete_all if songs_to_remove.size > 0
            current_user.songs.create(songs_list)
            Sidekiq::Client.push('queue' => current_user.id, 'class' => SongsDataWorker, 'args' => [current_user.id])
        end
    end

end

