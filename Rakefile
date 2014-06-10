%w{ bundler find rake/testtask}.each { |lib| require lib }

task :default => :spec

Rake::TestTask.new(:spec) do |t|
  t.test_files = FileList['spec/*_spec.rb']
end

namespace :db do
  desc "Run all migrations in db/migrate"
  task :migrate => :connect do
    Sequel.extension(:migration)
    Sequel::Migrator.apply(DB, "db/migrate")
  end

  task :connect => :environment do
    require "./config/initializers/database"
  end
end

namespace :app do |t|
  desc "キーワードに該当する検索順位取得"
  task :get_rank do
    require "./config/initializers/application"

    keyword = ENV['keyword']
    shopcode = ENV['shopcode']
    rank = 1
    
    @items = RakutenWebService::Ichiba::Item.search(:keyword => keyword)
    @items.each do |item|
      checkcode = item.code.split(":")
      if shopcode == checkcode[0]
        puts item.name + " 順位:#{rank}"
        Keen.publish(:item_rank, { :code => item.code, :name => item.name, :rank => rank, :keyword => keyword })
      end
      rank = rank + 1
    end
  end
end
