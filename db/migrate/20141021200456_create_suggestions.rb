class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.string :subject
      t.text :message
      t.references :user, index: true

      t.timestamps
    end
  end
end
