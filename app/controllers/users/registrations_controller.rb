class Users::RegistrationsController < Devise::RegistrationsController

  respond_to :json

  # I extended from basics: http://natashatherobot.com/devise-sign-up-ajax-rails/

  def create
    build_resource

    resource = User.create(filtered_params)
    resource.genPassword # auto gen password

    if resource.save
      sign_up(resource_name, resource)
      render json: { success: true, user: resource}, status: 200
    else
      # send 406 - resource not acceptable due to validation issues
      render json: { success: false, errors: resource.errors.full_messages }, status: 406
    end

    begin
      #return render json: { status: 200, success: true, user: resource}
      #begin
      #  sign_up(resource_name, resource)
      #rescue
      #  return render json: { status: 401, success: false}
      #end
    #rescue
    #  return render json: { status: 500, success: false, info: resource.errors.full_messages}
    end

    #if resource.save
    #  if resource.active_for_authentication?
    #    sign_up(resource_name, resource)
    #    return render json: { status: 200, success: true, user: resource}
    #  else
    #    expire_session_data_after_sign_in!
    #    return render json: { status: 200, success: true, user: resource}
    #  end
    #else
    #  clean_up_passwords resource
    #  # @TODO correct error code
    #  return render json: { status: 401, success: false}
    #end

  end

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

  private

    def filtered_params
      params.require(:user).permit(:email, :password)
    end

end
