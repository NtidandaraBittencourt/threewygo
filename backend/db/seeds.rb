# db/seeds.rb

Course.destroy_all
Video.destroy_all

10.times do |i|
  course = Course.create!(
    title: "Curso #{i + 1}",
    description: "Descrição do curso #{i + 1}",
    start_date: Date.today - (10 - i).days,
    end_date: Date.today + (10 - i).days
  )

  2.times do |j|
    Video.create!(
      title: "Video #{j + 1} do curso #{i + 1}",
      description: "Descriação #{j + 1} do curso #{i + 1}",
      url: "http://example.com/video_#{j + 1}_course_#{i + 1}.mp4",
      course: course
    )
  end
end

puts "Seeds criados: #{Course.count} cursos e #{Video.count} videos."
