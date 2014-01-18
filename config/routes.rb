App::Application.routes.draw do

  devise_for :users, skip: :all
  devise_scope :user do
    post "users/sign_in" => "users/sessions#create"
    get "users/logout" => "users/sessions#destroy"
    post "users/sign_up" => "users/registrations#create"
    get "users/restore" => "users/sessions#show_current_user"
  end

  # Client:toChooseUrl --req--> Rack --routes--> Controller:pages#index --renders Layout:withoutYield --> Client:withChosenUrl
  # --> angular:picksBrowserUrl --pushState-> Client

  # route any client requests to angular main app
  # pages#index doesn nothing but render layout
  get "/" => "pages#index"
  get "/(:pages(/:subpage))" => "pages#index"

  # deliver templates angular client is requesting
  scope "/angular", controller: :angular_templates do

    # secure some pages
    get "/pages/profile", action: :secure
    get "/pages/xyz",  action: :secure

    # non restricted
    get ":template_class/:template_name", action: :public
  end


end
