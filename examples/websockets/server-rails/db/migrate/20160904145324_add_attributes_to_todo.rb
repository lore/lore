class AddAttributesToTodo < ActiveRecord::Migration[5.0]
  def change
    add_column :todos, :title, :string
    add_column :todos, :description, :text
    add_column :todos, :isCompleted, :boolean
    add_column :todos, :priority, :integer
  end
end
