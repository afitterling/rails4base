App::Application.routes.draw do

  devise_for :users, skip: :all
  devise_scope :user do
    post "users/sign_up" => "users/registrations#create"
    
    post "users/sign_in" => "users/sessions#create"
    get "users/logout" => "users/sessions#destroy"
    get "users/restore" => "users/sessions#user_logged_in"

    get "users/confirmation/new" => "users/confirmations#new" #, as: "new_user_confirmation"
    post "users/confirmation" => "users/confirmations#create" #, as: "user_confirmation"
    get "users/confirmation/:confirmation_token/:id" => "users/confirmations#show", as: "confirmation"

    #@TODO password

    put "users/password" => "api/users#update"
    patch "users/password" => "api/users#update"

  end

  
  ## api
  scope "/api", module: "api" do
     get "/json" => "demo#index"
  end

  # route any client requests to angular main app
  # pages#index does nothing but render layout (which contains ng-view)
  get "/" => "pages#index"
  get "/(:pages(/:subpage))" => "pages#index"

  # deliver templates angular client app is requesting
  scope "/angular", controller: :angular_templates do

    # secure following urls server side and suggest client app alternate client_path
    scope "/", action: :secure, status: 401, client_path: "/login" do
      get "/pages/profile"
    end

    # if authenticated, hide temporarily following angular server side urls and suggest client
    # alternate angular $location path (client_path) where it should navigate to upon status received
    scope "/", action: :hide, status: 423 do
      get "/pages/login", client_path: "/profile"
      get "/pages/signup", client_path: "/profile"
    end

    # non restricted
    get ":template_class/:template_name", action: :public
  end


end
