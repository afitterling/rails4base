class Users::SessionsController < Devise::SessionsController

  respond_to :json

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged in",
                      :user => current_user
           }
    return
  end

  def destroy
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    sign_out
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged out",
           }
  end

  def failure
    render :status => 401,
           :json => { :success => false,
                      :info => "Login Credentials Failed"
           }
  end

  def user_logged_in
    # @TODO is it safe to to send 401 here? this will get handled better in angular
    warden.authenticate!(:scope => resource_name) #, :recall => "#{controller_path}#failure")
    user = User.where(id: current_user.id).first
    #user.confi
    render :status => 200,
           :json => { :success => true,
                      :info => "Current User",
                      :user => user.as_json

           }

  end

end
