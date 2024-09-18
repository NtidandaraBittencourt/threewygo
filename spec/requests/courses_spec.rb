# spec/requests/courses_spec.rb
require 'rails_helper'

RSpec.describe "Courses", type: :request do
  let!(:course) { Course.create(title: "Sample Course", description: "This is a sample course", end_date: Date.today + 1) }

  describe "GET /courses" do
    it "returns a list of courses" do
      get courses_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Sample Course")
    end
  end

  describe "GET /courses/:id" do
    it "returns a specific course" do
      get course_path(course)
      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Sample Course")
    end
  end

  describe "POST /courses" do
    it "creates a new course" do
      post courses_path, params: { course: { title: "New Course", description: "New course description", end_date: Date.today + 2 } }
      expect(response).to have_http_status(:created)
      expect(Course.last.title).to eq("New Course")
    end
  end

  describe "PATCH/PUT /courses/:id" do
    it "updates an existing course" do
      patch course_path(course), params: { course: { title: "Updated Course" } }
      expect(response).to have_http_status(:ok)
      expect(course.reload.title).to eq("Updated Course")
    end
  end

  describe "DELETE /courses/:id" do
    it "deletes a course" do
      expect {
        delete course_path(course)
      }.to change(Course, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
