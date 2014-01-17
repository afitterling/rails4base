App::Application.routes.draw do

  #devise_for :users
  devise_scope :user do
    post "users/sign_in" => "users/sessions#create"
    get "users/logout" => "users/sessions#destroy"
    post "users/sign_up" => "users/registrations#create"
    get "users/restore" => "users/sessions#show_current_user"
  end

  get "/" => "pages#index"

  # angular: template controller for directives (see directives)
  get "/angular/:template_class/:template_name" => "angular_templates#show"

end
