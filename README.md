Keen IOと楽天API連携
===
# 目的
データ分析サービス[Keen IO](https://keen.io/)を楽天APIと連携する。

# 前提
| ソフトウェア     | バージョン    | 備考         |
|:---------------|:-------------|:------------|
| OS X           |10.8.5        |             |
| ruby      　　　|2.1.1         |             |

+ [sinatraで楽天APIを利用したWebアプリを作る](https://github.com/k2works/sinatra_rakuten_api)
+ [Keen IO入門](https://github.com/k2works/keenio_introduction)

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
## <a name="2">Keen IOプロジェクトセットアップ</a>
Keen IOにログインして[新しいプロジェクトを作る](https://keen.io/add-project)。  

## <a name="3">環境設定</a>
### Procfle追加
_Procfile_
```
web: bundle exec rackup config.ru -p $PORT
```
### 楽天API対応
_Gemfile_
```ruby
gem "rakuten_web_service"
```
### Keen対応
_Gemfile_
```ruby
gem "keen"
```
_views/layout.erb_
```ruby
  <script>
  var Keen=Keen||{configure:function(e){this._cf=e},addEvent:function(e,t,n,i){this._eq=this._eq||[],this._eq.push([e,t,n,i])},setGlobalProperties:function(e){this._gp=e},onChartsReady:function(e){this._ocrq=this._ocrq||[],this._ocrq.push(e)}};(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://":"http://")+"dc8na2hxrj29i.cloudfront.net/code/keen-2.1.0-min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();

  // Configure the Keen object with your Project ID and (optional) access keys.
  Keen.configure({
      projectId: "<%= ENV['KEEN_PROJECT_ID'] %>",
      writeKey: "<%= ENV['KEEN_WRITE_KEY'] %>", // required for sending events
      readKey: "<%= ENV['KEEN_READ_KEY'] %>"    // required for doing analysis
  });
  </script>
```
### .envファイル追加
_.env_ファイルを_.gitignore_ファイルに追加する。

### Livereload対応
_Gemfile_
```ruby
gem 'guard'
gem 'guard-livereload'
gem 'rack-livereload'
```
Guardファイルを作成
_Guardfile_
```ruby
guard 'livereload' do
  watch(%r{views/.+\.(erb|haml|slim|s[ac]ss|coffee)$})
  watch(%r{.+\.(rb)$})
end
```

### デバッグ環境
_Gemfile_
```ruby
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
```
## <a name="4">イベント送信</a>
### 共通設定ファイル追加
_config/initializers/application.rb_
```ruby
require 'sinatra'
require 'pry'
require 'rakuten_web_service'
require 'keen'

RakutenWebService.configuration do |c|
  c.application_id = ENV['RAKUTEN_APPLICATION_ID']
  c.affiliate_id = ENV['RAKUTEN_AFFILIATE_ID']
end
```
### Rakeタスク作成
_Rakefile_
```ruby
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
```
### Rakeタスク実行
```bash
$ foreman run rake keyword='クエン酸' shopcode='healthy-company' app:get_rank
クエン酸のメダリッツ分包タイプ（メダリストタブレット）10粒×50袋【送料無料・サプリ・健康食品】 順位:3
クエン酸のメダリッツ・ボトルタイプ（メダリストタブレット）500粒入り【送料無料・サプリ・健康食品】 順位:4
【メール便専用・代引き不可】【送料無料】クエン酸（無水）1kg 順位:8
【送料無料】クエン酸サプリメントの定番【メダリスト】1L用　28g×16袋入り 順位:18
【送料無料】クエン酸サプリメトの定番メダリスト・チーム用大袋・560g(20L用） 順位:20
クエン酸（無水）1kg(純度99.5％以上・食品添加物グレード） 順位:27
【4つ以上で送料無料】大変お得！アリスト社の自衛隊専用商品！メダリスト　クエン酸コンクRJ　900ml 順位:33
クエン酸サプリメントの人気商品メダリスト　500ml用　15g×12袋 順位:41
【4本で送料無料】 グレープフルーツ味メダリスト・クエン酸コンクミネラル・900ML 順位:73
BCAA高配合！メダリスト・アミノダイレクト5500（クエン酸・バリン・ロイシン・イソロイシン） 順位:83
クエン酸サプリメントの定番メダリスト携帯用4.5g×30袋入り 順位:107
クエン酸の【メダリストシリーズ・新製品】Bimania（美マニア）4.5g×12袋 順位:111
【4つ購入で送料無料】クエン酸サプリの定番メダリストゼリー190g×6PC入り 順位:119
クエン酸の【メダリストシリーズ・新製品】Bimania（美マニア）4.5g×45袋 順位:128
クエン酸のメダリッツ（メダリストタブレット）お試しタイプ(10粒×7袋) 順位:189
クエン酸メダリストZERO・アップル風味500ml用・12.5g×10pc 順位:1088
```
## <a name="5">データ分析と視覚化</a>
### 表示用JavaScript追加
_public/javascripts/keenio.js_
### アプリケーション修正
_keenio_rakuten_api.rb_
```ruby
get "/" do
  keen_filters = [property_name:'code',operator:'ne',property_value:'healthy-company:10000108']
  @ranks = Keen.extraction("item_rank",filters:keen_filters,latest:'20')
  erb :welcome
end
```
### ビュー修正
_views/layout.erb_
```ruby
<script src="javascripts/keenio.js"></script>
```
_views/welcome.erb_

## <a name="6">Herokuにアップする</a>

# 参照
+ [Keen IO](https://keen.io/)
+ [楽天WEB SERVICE](http://webservice.rakuten.co.jp/)
+ [Ruby SDK](http://webservice.rakuten.co.jp/sdk/ruby.html)
+ [GitHub](https://github.com/rakuten-ws/rws-ruby-sdk)
+ [[Ruby][rake]Rakeの基本的な使い方まとめ](http://d.hatena.ne.jp/unageanu/20100829/1283069269)
+ [Use environment variables in Rake task](http://stackoverflow.com/questions/15690135/use-environment-variables-in-rake-task)
