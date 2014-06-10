Keen IOと楽天API連携
===
# 目的
データ分析サービス[Keen IO](https://keen.io/)を楽天APIと連携する。

# 前提
| ソフトウェア     | バージョン    | 備考         |
|:---------------|:-------------|:------------|
| OS X           |10.8.5        |             |
| ruby      　　　|2.1.1         |             |

[sinatraで楽天APIを利用したWebアプリを作る](https://github.com/k2works/sinatra_rakuten_api)
[Keen IO入門](https://github.com/k2works/keenio_introduction)

# 構成
+ [セットアップ](#1)
+ [プロジェクトセットアップ](#2)
+ [環境設定](#3)
+ [イベント送信](#4)
+ [データ分析と視覚化](#5)
+ [Herokuにアップする](#6)

# 詳細
## <a name="1">セットアップ</a>
```bash
$ hazel keenio_rakuten_api -d sqlite --bundle --git
      create  keenio_rakuten_api/config/initializers
      create  keenio_rakuten_api/lib
      create  keenio_rakuten_api/spec
      create  keenio_rakuten_api/db/migrate
      create  keenio_rakuten_api/lib/.gitkeep
      create  keenio_rakuten_api/public/stylesheets
      create  keenio_rakuten_api/public/stylesheets/main.css
      create  keenio_rakuten_api/public/javascripts
      create  keenio_rakuten_api/public/javascripts/.gitkeep
      create  keenio_rakuten_api/public/images
      create  keenio_rakuten_api/public/images/.gitkeep
      create  keenio_rakuten_api/public/images/hazel_icon.png
      create  keenio_rakuten_api/public/images/hazel_small.png
      create  keenio_rakuten_api/public/favicon.ico
      create  keenio_rakuten_api/views
      create  keenio_rakuten_api/views/layout.erb
      create  keenio_rakuten_api/views/welcome.erb
      create  keenio_rakuten_api/keenio_rakuten_api.rb
      create  keenio_rakuten_api/spec/keenio_rakuten_api_spec.rb
      create  keenio_rakuten_api/spec/spec_helper.rb
      create  keenio_rakuten_api/config.ru
      create  keenio_rakuten_api/Gemfile
      create  keenio_rakuten_api/Rakefile
      create  keenio_rakuten_api/README.md
      create  keenio_rakuten_api/config/db.yml
      create  keenio_rakuten_api/config/initializers/database.rb
         run  git init . from "./keenio_rakuten_api"
Initialized empty Git repository in /Users/k2works/projects/github/keenio_rakuten_api/.git/
         run  bundle from "./keenio_rakuten_api"
Fetching gem metadata from https://rubygems.org/.........
Fetching additional metadata from https://rubygems.org/..
Resolving dependencies...
Using rake 10.3.2
Using minitest 5.3.4
Using rack 1.5.2
Using rack-protection 1.5.3
Using rack-test 0.6.2
Using sequel 4.11.0
Using tilt 1.4.1
Using sinatra 1.4.5
Using sqlite3 1.3.9
Using bundler 1.6.2
Your bundle is complete!
Use `bundle show [gemname]` to see where a bundled gem is installed.
MacBook-Air@k2works:github $ cd keenio_rakuten_api
```
## <a name="2">プロジェクトセットアップ</a>
## <a name="3">環境設定</a>
## <a name="4">イベント送信</a>
## <a name="5">データ分析と視覚化</a>
# 参照
+ [Keen IO](https://keen.io/)
+ [楽天WEB SERVICE](http://webservice.rakuten.co.jp/)
+ [Ruby SDK](http://webservice.rakuten.co.jp/sdk/ruby.html)
+ [GitHub](https://github.com/rakuten-ws/rws-ruby-sdk)
+ [[Ruby][rake]Rakeの基本的な使い方まとめ](http://d.hatena.ne.jp/unageanu/20100829/1283069269)
+ [Use environment variables in Rake task](http://stackoverflow.com/questions/15690135/use-environment-variables-in-rake-task)
