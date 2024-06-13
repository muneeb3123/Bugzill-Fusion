class CreateBugs < ActiveRecord::Migration[6.0]
  def change
    create_table :bugs do |t|
      t.string :title
      t.text :description
      t.date :deadline
      t.integer :bug_type
      t.integer :status, default: 0
      t.bigint :project_id, null: false
      t.bigint :creator_id, null: false
      t.bigint :developer_id

      t.timestamps
    end

    add_foreign_key :bugs, :projects
    add_foreign_key :bugs, :users, column: :creator_id
    add_foreign_key :bugs, :users, column: :developer_id

    add_index :bugs, :creator_id
    add_index :bugs, :project_id
    add_index :bugs, :title
  end
end
