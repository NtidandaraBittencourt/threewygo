Rails.application.routes.draw do
  resources :courses do
    collection do
      get 'search', to: 'courses#search'
    end
  end
end