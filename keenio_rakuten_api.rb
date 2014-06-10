class KeenioRakutenApi < Sinatra::Base

  set :public_folder => "public", :static => true

  get "/" do
    keen_filters = [property_name:'code',operator:'ne',property_value:'healthy-company:10000108']
    @ranks = Keen.extraction("item_rank",filters:keen_filters,latest:'20')
    erb :welcome
  end
end
