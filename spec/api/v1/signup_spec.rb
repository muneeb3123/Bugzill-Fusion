require 'swagger_helper'

RSpec.describe 'Users Registrations API', type: :request do

  let(:random_email) { Faker::Internet.email }

  path '/api/v1/signup' do

    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'

      description <<~DESC
       1- After logging in, copy the Bearer token from the response headers. This token indicates the user type (developer, manager, or QA) and contains all necessary information. You can use this token in other API endpoints.

       2-  **Note:** You can manually change the user type to manager, developer, or QA in the request body when using the "Try it out" feature.
      DESC

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              name: { type: :string },
              email: { type: :string, format: :email },
              password: { type: :string },
              password_confirmation: { type: :string },
              user_type: { type: :string, enum: ['manager', 'developer', 'qa'] },
            },
            required: ['name', 'email', 'password', 'password_confirmation', 'user_type'],
          }
        },
        required: true,
      }

      response '200', 'user created successfully' do
        let(:user) do
          {
            user: {
              name: 'John Doe',
              email: random_email,
              password: 'password',
              password_confirmation: 'password',
              user_type: 'manager'
            }
          }
        end
        run_test!
      end

      response '422', 'invalid request' do
        let(:user) do
          {
            user: {
              name: 'John Doe',
              email: random_email,
              password: 'password',
              password_confirmation: 'password',
              user_type: 'manager'
            }
          }
        end
        run_test!
      end
    end
  end
end
