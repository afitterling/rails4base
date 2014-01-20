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

  def hide
    if user_signed_in?
      render status: params[:status], json: {path: params[:client_path] }
    else
      if params[:failsafe]
        self.send(params[:failsafe])
      else
        public
      end
    end
  end

  private

  # build template path from url
    def partial_file
      # I had problems on jboss/torquebox if deploying to a context url. The code below works:
      # RAILS_RELATIVE_URL_ROOT='/app3' RAILS_ENV=production torquebox deploy --context-path='/app3'
      if ENV['RAILS_RELATIVE_URL_ROOT']
        path = request.fullpath.split(ENV['RAILS_RELATIVE_URL_ROOT'])[1]
      else
        path = request.fullpath
      end
      "#{Rails.root}/app/views/#{path}"
    end

    def partial_exists?
      !Dir.glob("#{partial_file}.*").empty?
    end

end
