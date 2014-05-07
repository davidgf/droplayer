class AddSongsMd5ToUsers < ActiveRecord::Migration
  def change
    add_column :users, :songs_md5, :binary, limit: 16
  end
end
