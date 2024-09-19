class CoursesController < ApplicationController
    before_action :set_course, only: %i[show update destroy]
  
    # GET /courses
    def index
      total_courses = Course.where('end_date >= ?', Date.today).count

      @courses = Course
        .where('end_date >= ?', Date.today)
        .includes(:videos)
        .page(params[:page])
        .per(params[:limit])

        render json: {
          courses: @courses.as_json(include: :videos),
          total: total_courses
        }
    end
  
    #GET /courses/1
    def show 
      render json: @course.as_json(include: :videos)
    end

    # POST /courses
    def create
      @course = Course.new(course_params)
    
      if @course.save
        render json: @course.as_json(include: :videos), status: :created
      else
        render json: @course.errors, status: :unprocessable_entity
      end
    end
  
    # PUT /courses/:id
    def update
      if @course.update(course_params)

        if params[:course][:videos_attributes].present?
          received_video_ids = params[:course][:videos_attributes].map { |v| v[:id] }.compact

          @course.videos.where.not(id: received_video_ids).destroy_all
    
          # Create or update videos
          params[:course][:videos_attributes].each do |video_params|
            if video_params[:id]
              video = @course.videos.find_by(id: video_params[:id])
              if video
                video.update(video_params.permit(:title, :url, :description))
              else
                @course.videos.create!(video_params.permit(:title, :url, :description))
              end
            else
              @course.videos.create!(video_params.permit(:title, :url, :description))
            end
          end
        end
    
        render json: @course.as_json(include: :videos), status: :ok
      else
        render json: @course.errors, status: :unprocessable_entity
      end
    end


    # DELETE /courses/:id
    def destroy
      @course.destroy
      head :no_content
    end
  
    private
  
    def set_course
      @course = Course.find_by(id: params[:id])
      unless @course
        render json: { error: 'Curso não encontrado.' }, status: :not_found
      end
    end
  

    def course_params
      params.require(:course).permit(
        :title, 
        :description, 
        :start_date, 
        :end_date, 
        videos_attributes: [:id, :title, :url, :description, :_destroy]
      )
    end

  end
  