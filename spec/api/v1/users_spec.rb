require 'swagger_helper'

RSpec.describe 'Users API', type: :request do

  path '/api/v1/users/qas' do

    get 'Retrieves all QA users' do
      tags 'Users'
      produces 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true, description: "First, login as Manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as Manager."

      response '200', 'QA users found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string }
            },
            required: [ 'id', 'name' ]
          }

        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end
  end

  path '/api/v1/users/developers' do

    get 'Retrieves all developer users' do
      tags 'Users'
      produces 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true, description: "First, login as Manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as Manager."

      response '200', 'developer users found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string }
            },
            required: [ 'id', 'name' ]
          }

        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end
  end
end
