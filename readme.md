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
  * renderer processでnodeモジュールを使うための設定
    * nodeintegrationを使用してrenderer processがnodeモジュールを使う機能が禁止された
    * preloadプロセスを立ててそこでexportしたものを、renderer processで使うことができる
    * webPrefarencesにpreloadをキー、preload.jsのパスをバリューにしたjsonを渡す
  * renderer process
    * `BrowserWindow`のインスタンスにloadFileでhtmlを食わせる
  * ウインドウの起動
    * app.whenReadyが準備できたら.thenでcreateWindowを実行する
      * 非同期実行でpromiseで動作する
    * `app.whenReady().then(createWindow)`
  * menueバーの設定
    * `remote`をかますと実行できない。　禁止になった？？
  * コンテキストメニューの設定
    * aa


### preload

* 普通にnodeモジュールを呼び出してよい
* renderer processにモジュールを渡すためには、electronの`contextBridge`のexposeInMainWorldを使用する
* モジュールやpreload内で定義した関数をjsonにして渡す
  * `contextBridge.exposeInMainWorld("モジュールセット名称" , 定義json)`
  * rendererでは`window.モジュールセット名称.属性名`で呼び出せる
* 関数を定義しておけばrendererでそのまま使える
  * コードのボリュームが多いときときはモジュール呼び出しだけにして、処理系は別スクリプトを書いた方がよさそう


### renderer process

* `window.モジュールセット名称.属性名`でpreload.jsで定義したモジュールや関数が使える


### 設定ファイルからパラメータを読み込む

* https://github.com/lorenwest/node-config
* 設定ファイル
  * `./config/default.json`
* 呼び方

```js
const config = require('config');
const server = config.get('server');
console.log(server.host)
```

```json: default.json
{
    "server": {
        "host": "localhost",
        "port": 5555
    }
}
```

