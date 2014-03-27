class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs, id: false, primary_key: :path_md5 do |t|
      t.string :title
      t.string :artist
      t.string :album
      t.string :genre
      t.string :path, null: false
      t.binary :path_md5, limit: 16.bytes
      t.references :user, index: true

      t.timestamps
    end
  end
end
