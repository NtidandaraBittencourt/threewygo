class CoursesController < ApplicationController
    before_action :set_course, only: %i[show update destroy]
  
    # GET /courses
    def index
      @courses = Course
        .where('end_date >= ?', Date.today)
        .includes(:videos)
        .page(params[:page])
        .per(params[:limit])

      render json: @courses.as_json(include: :videos)
    end
  
    #GET /courses/1
    def show 
      @course = Course.find(params[:id])
      render json: @course
    end


    # POST /courses
    def create
      @course = Course.new(course_params)
      
      if @course.save
        if params[:videos]
          params[:videos].each do |video|
            @course.videos.create(video.permit(:title, :url, :description))
          end
        end
        
        redirect_to @course, notice: 'Curso e vídeos criados com sucesso.'
      else
        render json: @course.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /courses/:id
    def update
      if @course.update(course_params)
        render json: @course
      else
        render json: @course.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /courses/:id
    def destroy
      @course.destroy
      head :no_content
    end

    # GET /courses/search
    def search
      @courses = Course.where('date_start <= ? AND date_end >= ?', params[:date_start], params[:date_end])
      render json: @courses
    end
  
    private
  
    # Use callbacks to share common setup or constraints between actions.
    def set_course
      @course = Course.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Course not found' }, status: :not_found
    end
  

    def course_params
      params.require(:course).permit(:title, :description, :start_date, :end_date, videos_attributes: [:title, :url, :description])
    end

  end
  