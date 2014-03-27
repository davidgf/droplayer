class AddId3toSongs < ActiveRecord::Migration
  def change
	add_column :songs, :id3, :boolean, default: false
  end
end
