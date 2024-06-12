class CurrentUsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    include RackSessionFix
    before_action :authenticate_user!
  
    def index
      if current_user
        render json: {
          user: current_user,
          status: :ok,
          message: 'You are logged in'
        }
      else
        render json: {
          errors: ['User not authenticated']
        }, status: :unprocessable_entity
      end
    end
end
