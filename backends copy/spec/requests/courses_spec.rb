require 'rails_helper'

RSpec.describe "Courses API", type: :request do
  before(:all) do
    Rails.application.load_seed
  end

  let!(:courses) { Course.all }
  let!(:course) { courses.first }
  let!(:video1) {course.videos.first}
  let!(:video2) {course.videos.second}


  describe "GET /courses" do
    it "Valida se retorna a lista dos cursos com os videos" do
      get '/courses', params: { page: 1, limit: 5 }

      expect(response).to have_http_status(:ok)
      
      json_response = JSON.parse(response.body)

      total_courses = Course.where('end_date >= ?', Date.today).count
      expect(json_response["total"]).to eq(total_courses)

      expect(json_response["courses"]).not_to be_empty
      json_response["courses"].each do |item|
        expect(item["videos"]).not_to be_empty
      end
    end
  end

  describe "POST /courses" do
    let(:invalid_attributes) do
      {
        course: {
          title: "",
          description: ""
        }
      }
    end

    context "Valida atributos" do
      valid_attributes = 
        {
          course: {
            title: "Novo curso",
            description: "descrição novo curso",
            start_date: Date.today,
            end_date: Date.today + 5,
            videos_attributes: [
              { title: "video 1", url: "http://example.com/new.mp4", description: "video 1 descrição" }
            ]
          },
        }
  

      it "cria um novo curso e associa vídeos" do
        post '/courses', params: valid_attributes

        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
  
        expect(json_response['title']).to eq('Novo curso')
        expect(json_response['videos'].count).to eq(1)
        expect(json_response['videos'].first['title']).to eq('video 1')
      end
    end

    context "Se atributos errados" do
      it "não cria novos cursos" do
        post '/courses', params: invalid_attributes

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response['title']).to include("can't be blank")
      end
    end
  end

  describe "PUT /courses/:id" do
   
    context "Atualiza curso e manipula vídeos" do
      it "atualiza um curso, remove vídeos não enviados e mantém os enviados" do
    
        updated_attributes = {
          course: {
            title: "Curso Atualizado",
            description: "Descrição atualizada",
            start_date: Date.today,
            end_date: Date.today + 5,
            videos_attributes: [
              {
                id: video1.id,
                title: "Vídeo Atualizado",
                url: "http://example.com/new.mp4",
                description: "Descrição do vídeo atualizado"
              }
            ]
          }
        }
    
        put "/courses/#{course.id}", params: updated_attributes, as: :json
    
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
    
        expect(json_response['title']).to eq('Curso Atualizado')
        expect(json_response['videos'].count).to eq(1)
        expect(json_response['videos'].first['title']).to eq('Vídeo Atualizado')
        expect(json_response['videos'].first['url']).to eq('http://example.com/new.mp4')
      end
    end

    context "with invalid attributes" do
      it "does not update the course" do
        invalid_attributes = { course: { title: "", description: "" } }
        
        put "/courses/#{course.id}", params: invalid_attributes

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response['title']).to include("can't be blank")
      end
    end
  end

  describe "DELETE /courses/:id" do
    it "Deleta o curso" do
      delete "/courses/#{course.id}"

      expect(response).to have_http_status(:no_content)
      expect(Course.exists?(course.id)).to be_falsey
    end
  end

end
