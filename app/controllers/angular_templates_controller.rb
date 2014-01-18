class AngularTemplatesController < ApplicationController

  def template_file
    #"#{Rails.root}/app/views/angular_partials/#{params[:template_class]}/#{params[:template_name]}"
    logger.debug "#{Rails.root}/app/views/#{request.fullpath}"
    "#{Rails.root}/app/views/#{request.fullpath}"
  end

  def public
    if !Dir.glob("#{template_file}.*").empty?
      render template_file, :layout => false
    else
      render text: :none, status: 404
    end

  end

  def secure
    if !Dir.glob("#{template_file}.*").empty?
      if user_signed_in?
        render template_file, :layout => false
      else
        render text: :none, status: 401
      end
    else
      render text: :none, status: 404
    end
  end

end
