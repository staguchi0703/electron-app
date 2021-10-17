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
    * promise実行時にcreateWindowに引数を与えるためにbindする
      * `createWindow.bind(null, 引数)`
  * menueバーの設定
    * `remote`を使ったrendererプロセス側からの定義は実行できなくなっている
    * 弄るならメインプロセス側で定義する
      * ipcでrenderer側からトリガをかけて実行するしかない。
      * 余り用途がなさそうなので実装の実験は行わない
        * ipcRenderer -> ipcMain.handle()などを使う
  * コンテキストメニューの設定
    * 


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

#### rendererで使えないnodeのライブラリを使う方法

* electronのメニューやコンテキスト、ファイルダイアログなどを使用する場合はmain processでないと実行できない
* main processで実行する方法を以下に記載する
  * main processに以下を用意する
    * ipcMain.handle("chanel_name", listner)
    * 返り値はpromise
    * listnerには呼び出し時に実行したいスクリプトを記載する
  * preload
    * contextBridge.exposeInMainWorldに呼び出したい処理を追加する
    * 追加の方法`channel名 : () => {ipcRenderer.invoke(channel, arg1, arg2....)}`
  * renderer
    * preloadのcontextBridge.exposeInMainWorldで設定したwindow属性から設定したmain processの処理へのipcRenderer.invokeを呼び出す
      * 例えば、window.myTestApi.playWavFile()
    * rendererが受け取ったら.then()を付けて()内に続きの処理を記載する
    * then()の中には返り値がresultで定義されている

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

