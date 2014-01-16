class AngularTemplatesController < ApplicationController

  def show
    render "#{params[:directive_name]}", :layout => false
  end

end
