require_relative "spec_helper"
require_relative "../keenio_rakuten_api.rb"

def app
  KeenioRakutenApi
end

describe KeenioRakutenApi do
  it "responds with a welcome message" do
    get '/'

    last_response.body.must_include 'Welcome to the Sinatra Template!'
  end
end
