class Api::DemoController < ApplicationController
  before_filter :authenticate_user!

  def index
    render json: { text: "Just a Demonstration!" }
  end

end