# electronで構築するzoremqと連携して動的にレンダリングするアプリ

## 環境構築

* electron
  * `npm install --save-dev electron typescript ts-node @types/node`
* zeromq
  * `npm install zeromq --save`

## electronの実行

* `npm start`
  * `tsc && electron .`

## electronのbuild


## アプリ

### main proccess

* index.ts
  * renderer processでnodeモジュールを使うための設定
    * nodeintegrationを使用してrenderer processがnodeモジュールを使う機能が禁止された
    * preloadプロセスを立ててそこでexportしたものを、renderer processで使うことができる
    * webPrefarencesにpreloadをキー、preload.jsのパスをバリューにしたjsonを渡す
  * preloadからmain processの関数を使う方法
    * `ipcMain.handle`に定義する

    ```ts: index.ts
    ipcMain.handle("ivent名称", (event, 引数1...) => {
        処理内容;
    })
    ```


  * main processの結果をレンダラーに返す
    * ipcMain.onを使う
    * ipcMainがメッセージ（第一引数）を受け取ったら、eventを受け取る
    * event.replyで返答する
      * 第一引数はメッセージ名、以下が値

    ```ts
      ipcMain.on("hello", (event: Electron.IpcMainEvent) => {
        console.log("get message.")
        const result = createWindow();
        console.log("result is " + String(result));
        event.reply('hello-result', win_name[result % 3] + '-' + result)
      });
    ```

  * rendererに値を送る
    * ipcMainで`BrowserWindow.getFocusedWindow()`を取得し、`webContents.send()`を送る

      ```ts 
        const w = BrowserWindow.getFocusedWindow();
        w?.webContents.send("hello", "message from app.")
      ```

  * 方法
    * send, on
    * invoke, handle

### preload

* 普通にnodeモジュールを呼び出して使える
* renderer processにモジュールを渡すためには、electronの`contextBridge`のexposeInMainWorldを使用する
* モジュールやpreload内で定義した関数をjsonにして渡す
  * `contextBridge.exposeInMainWorld("モジュールセット名称" , 定義json)`
  * rendererでは`window.モジュールセット名称.属性名`で呼び出せる
* 関数を定義しておけばrendererでそのまま使える
  * コードのボリュームが多いときときはモジュール呼び出しだけにして、処理系は別スクリプトを書いた方がよさそう
* preloadでGUIのDOMに対して操作する場合は、rendererの引数にhtml要素を渡しpreload側で処理する。


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

## zeromq

* v6.0を入れているのでgithubの最新を参照しないと動かない
* 非同期実行

## TODO

* 音再生
* 画像表示


## typescriptを入れる

* `npm install typescript --save-dev`
* `npx tsc --init`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["esnext","dom"],
    "outDir": "build",
    "rootDir": "src",
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```