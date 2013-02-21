
get '/g' do

  if !params[:u].match(/^http:/)
    return "Invalid image url"
  end

  open(params[:u], 'rb') do |f|
    i = MemeCaptain.meme_top_bottom(f, params[:t1], params[:t2], :font => './Impact.ttf')
    filename = "#{DateTime.now.to_sxg}#{SecureRandom.random_number(60**5).to_sxg}.jpg"
    i.write("./public/m/#{filename}")
    headers 'Content-type' => 'application/json'
    {imageUrl: "http://#{request.host}/#{filename}"}.to_json
  end

end
