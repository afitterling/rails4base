class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :restrict

  private

  def restrict
    unless user_signed_in?
      render json: {}, status: 401
    end
  end

end
