require 'swagger_helper'

RSpec.describe 'Bugs API', type: :request do

  path '/api/v1/bugs' do

    get 'Retrieves all bugs' do
      tags 'Bugs'
      produces 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true, description: "
      1- First, login to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as Login.

      2- **Note:** It will display all bugs to the developer and manager; the developer can see only those projects he is a part of.
      "

      response '200', 'bugs found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              description: { type: :string },
              status: { type: :string },
              deadline: { type: :string, format: :date },
              bug_type: { type: :string },
              project_id: { type: :integer },
              creator_id: { type: :integer },
              project_name: { type: :string }
            },
            required: [ 'id', 'title', 'description', 'status', 'project_id', 'project_name' ]
          }

        run_test!
      end

      response '422', 'unprocessable entity' do
        run_test!
      end
    end

    post 'Creates a bug' do
      tags 'Bugs'
      consumes 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true, description: "First, login as QA to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as QA."
      parameter name: :bug, in: :body, schema: {
        type: :object,
        properties: {
          bug: {
            type: :object,
            properties: {
              title: { type: :string },
              description: { type: :string },
              status: { type: :string },
              deadline: { type: :string, format: :date },
              bug_type: { type: :string },
              project_id: { type: :integer },
              creator_id: { type: :integer },
              screenshot: { type: :string, format: :binary }
            },
            required: [ 'title', 'description', 'project_id', 'creator_id' ]
          }
        },
        required: true
      }

      response '201', 'bug created successfully' do
        let(:bug) { { bug: { title: 'New Bug', description: 'Bug description', project_id: 1, creator_id: 1 } } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:bug) { { bug: { title: '', description: 'Bug description', project_id: 1, creator_id: 1 } } }
        run_test!
      end
    end
  end

  path '/api/v1/bugs/{id}' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
   1- First, log in as QA to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is the owner of this bug.

   2- Note: This will apply only to bugs created by the current QA, not bugs created by other QAs."

    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all bugs or create a new bug. From the response, copy the Bug Id and paste it into the ID field below."

    get 'Retrieves a bug' do
      tags 'Bugs'
      produces 'application/json'

      response '200', 'bug found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            title: { type: :string },
            description: { type: :string },
            status: { type: :string },
            deadline: { type: :string, format: :date },
            bug_type: { type: :string },
            project_id: { type: :integer },
            creator_id: { type: :integer },
            project_name: { type: :string }
          },
          required: [ 'id', 'title', 'description', 'status', 'project_id', 'project_name' ]

        let(:id) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1).id }
        run_test!
      end

      response '404', 'bug not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    put 'Updates a bug' do
      tags 'Bugs'
      consumes 'application/json'
      parameter name: :bug, in: :body, schema: {
        type: :object,
        properties: {
          bug: {
            type: :object,
            properties: {
              title: { type: :string },
              description: { type: :string },
              status: { type: :string },
              deadline: { type: :string, format: :date },
              bug_type: { type: :string },
              project_id: { type: :integer },
              creator_id: { type: :integer }
            }
          }
        },
        required: true
      }

      response '200', 'bug updated successfully' do
        let(:bug) { { bug: { title: 'Updated Bug Title', description: 'Updated Bug Description' } } }
        let(:id) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1).id }
        run_test!
      end

      response '422', 'invalid request' do
        let(:bug) { { bug: { title: '', description: 'Bug description', project_id: 1, creator_id: 1 } } }
        let(:id) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1).id }
        run_test!
      end

      response '404', 'bug not found' do
        let(:bug) { { bug: { title: 'Updated Bug Title', description: 'Updated Bug Description' } } }
        let(:id) { 'invalid' }
        run_test!
      end
    end

    delete 'Deletes a bug' do
      tags 'Bugs'
      produces 'application/json'

      response '200', 'bug deleted successfully' do
        let(:id) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1).id }
        run_test!
      end

      response '404', 'bug not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/bugs/{id}/assign_bug_or_feature' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
    1- First, login as a developer to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user has been added to this project by the project manager or owner
    
    2- **Note:**  Only developers who have been added to the project by the project manager can assign the project to themselves. All developers are unable to assign bugs or features and may not even be able to see them.
    "
    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all bugs or create a new bug. From the response, copy the Bug Id and paste it into the ID field below."

    post 'Assigns a bug or feature to the current user' do
      tags 'Bugs'
      consumes 'application/json'

      response '200', 'bug assigned successfully' do
        let(:id) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1).id }
        run_test!
      end

      response '422', 'bug already assigned to user' do
        let(:bug) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1, developer_id: 1).id }
        let(:id) { bug }
        run_test!
      end

      response '401', 'unauthorized' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/bugs/{id}/mark_resolved_or_completed' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
    1- First, login as a developer to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user has assigned themselves to this project.
    
    2-  **Note:** Only the developer to whom a bug or feature is assigned can mark it as resolved or finished."
    parameter name: :id, in: :path, type: :integer, description: "Please enter the bug ID for which you want to change the status."

    patch 'Marks a bug as resolved or completed' do
      tags 'Bugs'
      consumes 'application/json'

      response '200', 'bug marked as resolved or completed' do
        let(:bug) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1) }
        let(:id) { bug.id }
        run_test!
      end

      response '401', 'unauthorized' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '422', 'bug already resolved or completed' do
        let(:bug) { Bug.create(title: 'Test Bug', description: 'Bug description', project_id: 1, creator_id: 1, status: 'resolved') }
        let(:id) { bug.id }
        run_test!
      end
    end
  end
end
