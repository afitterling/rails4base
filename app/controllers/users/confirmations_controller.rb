class Users::ConfirmationsController < Devise::ConfirmationsController

  # GET /resource/confirmation/new
  def new
    self.resource = resource_class.new
  end

  # POST /resource/confirmation
  def create
    logger.debug self.resource
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      #respond_with({}, :location => after_resending_confirmation_instructions_path_for(resource_name))
      render status: 200
    else
      #respond_with(resource)
      render status: 500
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    yield resource if block_given?

    if resource.errors.empty?
      redirect_to "/profile"
    else
      redirect_to "/notfound" #@TODO be more precise -> /confirmation_not_found
    end
  end

  protected

  # The path used after resending confirmation instructions.
  def after_resending_confirmation_instructions_path_for(resource_name)
    new_session_path(resource_name) if is_navigational_format?
  end

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    if signed_in?
      signed_in_root_path(resource)
    else
      new_session_path(resource_name)
    end
  end
end