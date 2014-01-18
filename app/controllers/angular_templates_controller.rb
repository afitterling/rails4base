class AngularTemplatesController < ApplicationController

  def public
    if partial_exists?
      render partial_file, :layout => false
    else
      render text: :none, status: 404
    end

  end

  def secure
    if partial_exists?
      if user_signed_in?
        render partial_file, :layout => false
      else
        render text: :none, status: 401
      end
    else
      render text: :none, status: 404
    end
  end

  private

    def partial_file
      "#{Rails.root}/app/views/#{request.fullpath}"
    end

    def partial_exists?
      !Dir.glob("#{partial_file}.*").empty?
    end

end
