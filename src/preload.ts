import { ipcRenderer, contextBridge, dialog } from 'electron';

contextBridge.exposeInMainWorld(
    "myTestApi", {
        createWindow: async() => ipcRenderer.invoke("createWindow").then(()=>{
            let elm = document.querySelector("#msg_any")!
            elm.textContent = "createWindw";
        }),
        send:ipcRenderer.send,
        showMessage: ipcRenderer.invoke("showDialog"),
        // メイン → レンダラー
        on: (channel: any, callback: any) =>
            ipcRenderer.on(channel, (event: any, argv: any) => callback(event, argv))
    }

);
