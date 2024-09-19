# app/models/video.rb
class Video < ApplicationRecord
	belongs_to :course

	validates :title, presence: true, if: :url_present?

	private

	def url_present?
		url.present?
	end
end
  