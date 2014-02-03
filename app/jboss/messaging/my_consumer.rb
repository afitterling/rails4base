class MyConsumer < TorqueBox::Messaging::MessageProcessor
  def on_message(body)
    # The body will be of whatever type was published by the Producer
    # the entire JMS message is available as a member variable called message()
  end
  def on_error(exception)
    # You may optionally override this to interrogate the exception. If you do,
    # you're responsible for re-raising it to force a retry.
  end
end