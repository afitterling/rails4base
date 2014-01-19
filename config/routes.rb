App::Application.routes.draw do

  devise_for :users, skip: :all
  devise_scope :user do
    post "users/sign_in" => "users/sessions#create"
    get "users/logout" => "users/sessions#destroy"
    post "users/sign_up" => "users/registrations#create"
    get "users/restore" => "users/sessions#user_logged_in"
  end

  # Client:toChooseUrl --req--> Rack --routes--> Controller:pages#index --renders Layout:withoutYield --> Client:withChosenUrl
  # --> angular:picksBrowserUrl --pushState-> Client

  # route any client requests to angular main app
  # pages#index does nothing but render layout
  get "/" => "pages#index"
  get "/(:pages(/:subpage))" => "pages#index"

  scope module: "api" do
  end

  # deliver templates angular client is requesting
  scope "/angular", controller: :angular_templates do

    # secure following urls
    scope "/", action: :secure do
      get "/pages/profile"
      get "/pages/xyz"
    end

    # if authenticated, hide temporarily following angular server side urls and suggest client
    # alternate angular $location path (client_path) where it should navigate to upon status received
    scope "/", action: :hide do
      get "/pages/login", status: 423, client_path: "/profile"
      get "/pages/signup", status: 423, client_path: "/profile"
    end

    # non restricted
    get ":template_class/:template_name", action: :public
  end

end
