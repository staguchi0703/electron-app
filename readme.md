# electronで構築するzoremqと連携して動的にレンダリングするアプリ

## 環境構築

* electron
  * `npm install electron --save`
* zeromq
  * `npm install zeromq --save`

## electronの実行

* `/node_modules/electron/dist/electron.exe .`

## electronのbuild


## アプリ

### main proccess

* index.js
  * renderer processでnodeモジュールを使うために
    * nodeintegrationを使用してrenderer processがnodeモジュールを使う機能が禁止された
    * preload.jsを立ててexportしたものを、rendererで使う必要がある
    * webPrefarencesにpreloadをキー、preload.jsのパスをバリューにしたjsonを渡す
  * renderer process
    * `BrowserWindow`のインスタンスにloadFileでhtmlを食わせる
  * ウインドウの起動
    * app.whenReadyが準備できたら.thenでcreateWindowを実行する
      * 非同期実行でpromiseで動作する
    * `app.whenReady().then(createWindow)`


### preload

* 普通にnodeモジュールを呼び出してよい
* electronの`contextBridge`を呼び出す必要がある
* 最後にcontexBridgeを使用して、モジュールやpreload内で定義した関数をjsonにしてexposeする必要がある
  * `contextBridge.exposeInMainWorld("モジュールセット名称" , 定義json)`
  * rendererでは`window.モジュールセット名称.属性名`で呼び出せる
* 関数を定義しておけばrendererでそのまま使える
  * コードのボリュームが多いときときはモジュール呼び出しだけにして、処理系は別スクリプトを書いた方がよい


### renderer process

* `window.モジュールセット名称.属性名`でpreload.jsで定義したモジュールや関数が使える