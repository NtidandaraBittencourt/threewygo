RSpec.describe Video, type: :model do
    it "valida se o title e a url estão presentes" do
      video = Video.new(title: "Video 1", url: "http://example.com")
      expect(video).to be_valid
    end
  
    it "valida se tem url e não titulo" do
      video = Video.new(url: "http://example.com")
      expect(video).to_not be_valid
    end
  end
  