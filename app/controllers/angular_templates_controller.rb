class AngularTemplatesController < ApplicationController

  def restricted_pages
    ['profile','xyz','ddd']
  end

  def show
    # as the client will request the template through angular it will specify the template_class
    if restricted_pages.include?(params[:template_name]) && params[:template_class]=='pages' && !user_signed_in?
      render text: :none, status: 401
    else
      template_file = "#{Rails.root}/app/views/angular_partials/#{params[:template_class]}/#{params[:template_name]}"
      if !Dir.glob("#{template_file}.*").empty?
        render template_file, :layout => false
      else
        render text: :none, status: 404
      end
    end
  end

end
