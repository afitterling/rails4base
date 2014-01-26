class Api::UsersController < RestrictedApplicationController

  def update
    user = User.where(id: params[:id]).first
    # only update password
    user.password = params[:password]
    if user.save
      render json: {}, status: 200
    else
      render json: {}, status: 500
    end
  end

  def filtered_params
    params.require(:user).permit(:password)
  end

end
