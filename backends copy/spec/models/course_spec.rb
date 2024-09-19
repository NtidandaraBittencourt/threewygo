require 'rails_helper'

RSpec.describe Course, type: :model do
  it "valida atributos obrigatorios" do
    course = Course.new(title: "Curso 1", start_date: Date.today, end_date: Date.tomorrow)
    expect(course).to be_valid
  end

  it "valida se faltar o titulo" do
    course = Course.new(start_date: Date.today, end_date: Date.tomorrow)
    expect(course).to_not be_valid
  end

  it "valida se a data de inicio é maior que a data final" do
    course = Course.new(title: "Curso 1", start_date: Date.tomorrow, end_date: Date.today)
    expect(course).to_not be_valid
  end
end
