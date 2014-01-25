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
    response.headers['X-CSRF-Token'] = form_authenticity_token
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
    warden.authenticate!(:scope => resource_name) #, :recall => "#{controller_path}#failure")
    user = User.find(current_user.id)
    render status: 200,
           json: { success: true,
                      info: "Current User",
                      user: user.as_json
           }
  end

end
