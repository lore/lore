class TodoBroadcastJob < ApplicationJob
  queue_as :default

  def perform(todo, verb)
    ActionCable.server.broadcast 'todo_channel', verb: verb, data: todo
  end

  # def perform_update(todo)
  #   ActionCable.server.broadcast 'todo_channel', verb: :updated, data: todo
  # end
  #
  # def perform_destroy(todo)
  #   ActionCable.server.broadcast 'todo_channel', verb: :destroyed, data: todo
  # end

end
