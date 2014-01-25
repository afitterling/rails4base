class Api::UsersController < RestrictedApplicationController

  respond_to :json

  #@FIXME
  def update
    user = User.where(id: params[:id]).first
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
