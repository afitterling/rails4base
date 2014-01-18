App::Application.routes.draw do

  devise_for :users, skip: :all
  devise_scope :user do
    post 'users/sign_in' => 'users/sessions#create'
    get 'users/logout' => 'users/sessions#destroy'
    post 'users/sign_up' => 'users/registrations#create'
    get 'users/restore' => 'users/sessions#show_current_user'
  end

  # Client:toChooseUrl --req--> Rack --routes--> Controller:pages#index --renders Layout:withoutYield --> Client:withChosenUrl
  # --> angular:picksBrowserUrl --pushState-> Client

  # route any client reqs to angular main app
  get '/' => 'pages#index'
  get '/(:pages(/:subpage))' => 'pages#index'

  # angular template controller for partials/directives used in angular code parts
  get '/angular/:template_class/:template_name' => 'angular_templates#show'

end
