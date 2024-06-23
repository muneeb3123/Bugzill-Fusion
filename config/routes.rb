Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  scope :api, defaults: { format: :json } do
    scope :v1 do
      devise_for :users, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }
    end
  end

  namespace :api do
    namespace :v1 do

  resources :projects do
    member do
      post 'assign_user/:user_id', action: :assign_user
      delete 'remove_user/:user_id', action: :remove_user
      get 'users_and_bugs_by_project'
    end
    collection do
      get 'search'
    end
  end

  resources :users do
    collection do
      get :developers
      get :qas
    end
  end

  resources :bugs do
    member do
      put :assign_bug_or_feature
      put :mark_resolved_or_completed
    end
  end

  get '/current_user', to: 'current_users#index'
end
  end

  root 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
