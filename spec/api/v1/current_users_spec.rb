require 'swagger_helper'

RSpec.describe 'Current Users API', type: :request do

  path '/api/v1/current_users' do

    get 'Retrieves the current user' do
      tags 'Current Users'
      produces 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true, description: "First, login to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is Login."

      response '200', 'user authenticated' do
        schema type: :object,
          properties: {
            user: {
              type: :object,
              properties: {
                id: { type: :integer },
                email: { type: :string },
                created_at: { type: :string, format: :date_time },
                updated_at: { type: :string, format: :date_time }
              }
            },
            status: { type: :string },
            message: { type: :string }
          },
          required: [ 'user', 'status', 'message' ]

        run_test!
      end

      response '422', 'user not authenticated' do
        run_test!
      end
    end
  end
end
