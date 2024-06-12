class AddColumnsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string
    add_column :users, :user_type, :integer
    add_column :users, :jti, :string
    add_index :users, :jti, unique: true
  end
end
