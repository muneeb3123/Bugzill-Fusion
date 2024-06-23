require 'swagger_helper'

RSpec.describe 'Users Sessions API', type: :request do

  path '/api/v1/login' do

    post 'Logs in a user' do
      tags 'Users'
      consumes 'application/json'

    description <<~DESC
        1- After logging in, copy the Bearer token from the response headers. This token indicates the user type (developer, manager, or QA) and contains all necessary information. You can use this token in other API endpoints.

        2- When using the "Try it out" feature, you can manually change the email and password in the request body to login as another user.
      DESC

      parameter name: :user_credentials, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              email: { type: :string, format: :email },
              password: { type: :string }
            },
            required: ['email', 'password']
          }
        },
        required: true,
      }

      response '200', 'user logged in successfully' do
        let(:user_credentials) do
          {
            user: {
              email: 'john.doe@example.com',
              password: 'password'
            }
          }
        end
        run_test!
      end

      response '401', 'unauthorized' do
        let(:user_credentials) do
          {
            user: {
              email: 'invalid@example.com',
              password: 'invalidpassword'
            }
          }
        end
        run_test!
      end
    end
  end
end
