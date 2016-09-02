# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class TodosChannel < ApplicationCable::Channel
  def subscribed
    stream_from "todo_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
