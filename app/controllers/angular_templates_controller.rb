class AngularTemplatesController < ApplicationController

  def show
    render "angular_partials/#{params[:template_class]}/#{params[:template_name]}", :layout => false
  end

end
