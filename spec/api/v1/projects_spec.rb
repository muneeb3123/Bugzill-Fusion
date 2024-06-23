require 'swagger_helper'

RSpec.describe 'Projects API', type: :request do

    let(:valid_headers) {
    {
      'Authorization' => 'Bearer your_token_here',
      'Content-Type' => 'application/json'
    }
  }

  path '/api/v1/projects' do

    get 'Retrieves all projects' do
        tags 'Projects'
        produces 'application/json'
  
        parameter name: :Authorization, in: :header, type: :string, required: true, description: "
        1- First, log in to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as the logged-in user.
        
        2- Managers can see all projects, QA can see all projects, and developers can only see projects to which they have been added by manager. Developers cannot see all projects; they can only see those they are involved in.
        "
  
        response '200', 'projects found' do
          schema type: :array,
            items: {
              type: :object,
              properties: {
                id: { type: :integer },
                name: { type: :string },
                description: { type: :string }
              },
              required: ['id', 'name', 'description']
            }
  
          run_test! do
            expect(response).to have_http_status(:ok)
          end
        end
    end

    post 'Creates a project' do
        tags 'Projects'
        consumes 'application/json'
        parameter name: :Authorization, in: :header, type: :string, required: true, description: "
        1- First, log in as Manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as the Manager.
        
        2- Only the manager is able to create projects.
        "
        parameter name: :project, in: :body, schema: {
          type: :object,
          properties: {
            name: { type: :string },
            description: { type: :string }
          },
          required: [ 'name', 'description' ]
        }
      
        response '201', 'project created successfully' do
          let(:project) { { name: 'New Project', description: 'Project description' } }
          run_test!
        end
      
        response '422', 'invalid request' do
          let(:project) { { name: '', description: 'Project description' } }
          run_test!
        end
      end
    end  

  path '/api/v1/projects/{id}' do
    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all projects or create a new project. From the response, copy the Project ID and paste it into the ID field below."
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
        1- First, log in as Manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as the Manager.
        
        2- Only the owner of the project can perform actions; not all managers can.
        "

    get 'Retrieves a project' do
      tags 'Projects'
      produces 'application/json'

      response '200', 'project found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            description: { type: :string }
          },
          required: [ 'id', 'name', 'description' ]

        let(:id) { Project.create(name: 'Test Project', description: 'Test Description').id }
        run_test!
      end

      response '404', 'project not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    put 'Updates a project' do
      tags 'Projects'
      consumes 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true
      parameter name: :project, in: :body, schema: {
        type: :object,
        properties: {
          project: {
            type: :object,
            properties: {
              name: { type: :string },
              description: { type: :string }
            }
          }
        },
        required: true
      }

      response '200', 'project updated successfully' do
        let(:project) { { project: { name: 'Updated Project Name', description: 'Updated Project Description' } } }
        let(:id) { Project.create(name: 'Test Project', description: 'Test Description').id }
        run_test!
      end

      response '422', 'invalid request' do
        let(:project) { { project: { name: '', description: 'Project description' } } }
        let(:id) { Project.create(name: 'Test Project', description: 'Test Description').id }
        run_test!
      end

      response '404', 'project not found' do
        let(:project) { { project: { name: 'Updated Project Name', description: 'Updated Project Description' } } }
        let(:id) { 'invalid' }
        run_test!
      end
    end

    delete 'Deletes a project' do
      tags 'Projects'
      produces 'application/json'

      response '200', 'project deleted successfully' do
        let(:id) { Project.create(name: 'Test Project', description: 'Test Description').id }
        run_test!
      end

      response '404', 'project not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/projects/{id}/assign_user' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
        1- First, log in as a manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is authenticated as the owner of this project.
        
        2- Only the owner of the project can assign users.
        "
    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all projects or create a new project. From the response, copy the Project ID and paste it into the ID field below."

    post 'Assigns a user to a project' do
      tags 'Projects'
      consumes 'application/json'

      response '200', 'user assigned successfully' do
        let(:id) { Project.create(name: 'Test Project', description: 'Test Description').id }
        let(:user_id) { User.create(email: 'test@example.com', password: 'password').id }
        run_test!
      end

      response '404', 'project or user not found' do
        let(:id) { 'invalid' }
        let(:user_id) { 'invalid' }
        run_test!
      end

      response '422', 'user already assigned to project' do
        let(:project) { Project.create(name: 'Test Project', description: 'Test Description') }
        let(:user) { User.create(email: 'test@example.com', password: 'password') }
        let(:id) { project.id }
        let(:user_id) { user.id }
        before { project.users << user }
        run_test!
      end
    end
  end

  path '/api/v1/projects/{id}/remove_user' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
    1- First, log in as a manager to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is authenticated as the owner of this project.
    
    2- Only the owner of the project can remove user.
    "
    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all projects or create a new project. From the response, copy the Project ID and paste it into the ID field below."

    delete 'Removes a user from a project' do
      tags 'Projects'
      consumes 'application/json'

      response '200', 'user removed successfully' do
        let(:project) { Project.create(name: 'Test Project', description: 'Test Description') }
        let(:user) { User.create(email: 'test@example.com', password: 'password') }
        let(:id) { project.id }
        let(:user_id) { user.id }
        before { project.users << user }
        run_test!
      end

      response '404', 'project or user not found' do
        let(:id) { 'invalid' }
        let(:user_id) { 'invalid' }
        run_test!
      end

      response '422', 'user not assigned to project' do
        let(:project) { Project.create(name: 'Test Project', description: 'Test Description') }
        let(:user) { User.create(email: 'test@example.com', password: 'password') }
        let(:id) { project.id }
        let(:user_id) { user.id }
        run_test!
      end
    end
  end

  path '/api/v1/projects/{id}/users_and_bugs_by_project' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
    1- First, log in to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as the logged-in user.
        
    2- Managers can see all projects, QA can see all projects, and developers can only see projects to which they have been added by manager. Developers cannot see all projects; they can only see those they are involved in.
        "
    parameter name: :id, in: :path, type: :integer, description: "First, retrieve all projects or create a new project. From the response, copy the Project ID and paste it into the ID field below."

    get 'Retrieves users and bugs for a project' do
      tags 'Projects'
      produces 'application/json'

      response '200', 'users and bugs retrieved successfully' do
        let(:project) { Project.create(name: 'Test Project', description: 'Test Description') }
        let(:id) { project.id }
        before { project.users << User.create(email: 'test@example.com', password: 'password') }
        before { project.bugs.create(title: 'Bug 1', description: 'Bug description', status: 'open') }
        run_test!
      end

      response '404', 'project not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/projects/search' do
    parameter name: :Authorization, in: :header, type: :string, required: true, description: "
    1- First, log in to obtain the Bearer token. Then, copy the Bearer token from the response headers and paste it into the Authorization field below. The Authorization token must be provided and must indicate that the user is identified as the logged-in user.
        
    2- Managers can see all projects, QA can see all projects, and developers can only see projects to which they have been added by manager. Developers cannot see all projects; they can only see those they are involved in.
        "

    get 'Searches projects by name' do
      tags 'Projects'
      produces 'application/json'
      parameter name: :query, in: :query, type: :string, required: true

      response '200', 'projects found' do
        let(:project1) { Project.create(name: 'Test Project 1', description: 'Test Description') }
        let(:project2) { Project.create(name: 'Test Project 2', description: 'Test Description') }
        let(:query) { 'test' }
        run_test!
      end

      response '400', 'query parameter is missing' do
        run_test!
      end

      response '404', 'no projects found' do
        let(:query) { 'invalidquery' }
        run_test!
      end
    end
  end
end
