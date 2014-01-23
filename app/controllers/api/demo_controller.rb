class Api::DemoController < ApplicationController
  before_filter :restrict

  def index
    render json: { text: "Just a Demonstration!" }
  end

  private

    def restrict
      unless user_signed_in?
        render json: {}, status: 401
      end
    end

end