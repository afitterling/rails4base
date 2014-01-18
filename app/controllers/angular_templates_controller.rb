class AngularTemplatesController < ApplicationController

  def template_file
    "#{Rails.root}/app/views/angular_partials/#{params[:template_class]}/#{params[:template_name]}"
  end

  def public
    if !Dir.glob("#{template_file}.*").empty?
      render template_file, :layout => false
    else
      render text: :none, status: 404
    end

  end

  def secure
    if user_signed_in?
      if !Dir.glob("#{template_file}.*").empty?
        render template_file, :layout => false
      else
        render text: :none, status: 404
      end
    else
      render text: :none, status: 401
    end
  end

end
