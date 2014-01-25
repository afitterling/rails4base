class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource

    resource = User.create(filtered_params)

    password = ('0'..'z').to_a.shuffle.first(8).join
    resource.password = password

    if resource.save
      sign_up(resource_name, resource)
      render json: { success: true, user: resource}, status: 200
    else
      # send 406 - resource not acceptable due to validation issues
      render json: { success: false, errors: resource.errors.full_messages }, status: 406
    end

  end

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

  private

    def filtered_params
      params.require(:user).permit(:email, :password)
    end

end
