import { ipcRenderer, contextBridge, dialog} from 'electron';
import * as fs from 'fs';

function getSampleTxtPath() {
    ipcRenderer.send("getFilePath");
}

contextBridge.exposeInMainWorld(
    "myTestApi", {
        createWindow: async() => ipcRenderer.invoke("createWindow").then(()=>{
            let elm = document.querySelector("#msg_any")!
            elm.textContent = "createWindw";
        }),
        send_hello: async() => ipcRenderer.send("hello"),
        getSampleTxtPath: getSampleTxtPath,
        fs: fs,
        // メイン → レンダラー
        on: (channel: any, callback: any) =>
            ipcRenderer.on(channel, (event: any, argv: any) => callback(event, argv))
    }

);
