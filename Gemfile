source "https://rubygems.org/"
ruby "2.1.1"

# App Stack
gem "sinatra", "~> 1.4"
gem "sequel"
gem "pg"
gem "rakuten_web_service"
gem "keen"

group :development,:test do
  gem "sqlite3"
  gem "rake", "~> 10.0"
  gem "minitest", "~> 5.2"
  gem "rack-test", "~> 0.6"
  gem 'guard'
  gem 'guard-livereload'
  gem 'rack-livereload'
  gem 'pry'
  gem 'pry-doc'
  gem 'pry-stack_explorer'

  if RUBY_VERSION >= '2.0.0'
    gem 'pry-byebug'
  else
    # 以下はRuby1.9の時のみ使う(pry-byebugの代わりに)
    # debuggerは1.9以下でしか動作しない, remote は byebug で使えないようになった
    gem 'pry-debugger'
    gem 'pry-remote'
  end
end
