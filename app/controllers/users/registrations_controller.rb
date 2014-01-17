class Users::RegistrationsController < Devise::RegistrationsController

  respond_to :json

  # I got this from: http://natashatherobot.com/devise-sign-up-ajax-rails/

  def create
    build_resource

    if resource.save
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        return render :json => {:success => true}
      else
        expire_session_data_after_sign_in!
        return render :json => {:success => true}
      end
    else
      clean_up_passwords resource
      return render :json => {:success => false}
    end
  end

  # Signs in a user on sign up. You can overwrite this method in your own
  # RegistrationsController.
  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

end
