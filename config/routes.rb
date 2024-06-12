Rails.application.routes.draw do
  get '/custom', to: 'custom#index'
  devise_for :users, path:'', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root 'home#index'
  get '/current_user', to: 'current_users#index'
  get '*path', to: 'home#index', via: :all 
end
