import { ipcRenderer, contextBridge, dialog} from 'electron';
import * as fs from 'fs';

function getSampleTxtPath() {
    ipcRenderer.send("getFilePath");
}

function showRSS(url:string, elm:Element){
    ipcRenderer.send("getRSS", url);
    ipcRenderer.on("getRSS-result", (event, data) => {
        elm.innerHTML = data
    })
}

function getCOVIDData(url:string, elm:Element) {

    const urldata = {
        method: "GET",
        protocol: "https:",
        hostname: "filesamples.com",
        port: 443,
        path: "/samples/code/json/sample2.json"
    }
    
    ipcRenderer.send("get-json-data", urldata);
    ipcRenderer.on("get-json-data-result", (event, data)=> {
        elm.innerHTML = jsonToTable(data);
    })
}

function jsonToTable(json:any): string {
    let table = '<table class="table"><thead><tr><th></th>';
    for (let ky in json) {
      let ob = json[ky];
      for (let ky2 in ob) {
        table += '<th>' + ky2 + '</th>';
      }
      break;
    }
    table += '</tr></thead><tbody>';
    for (let ky in json) {
      table += '<tr><td>' + ky + '</td>';
      let ob = json[ky];
      for (let ky2 in ob) {
        table += '<td>' + ob[ky2] + '</td>';
      }
      table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}


contextBridge.exposeInMainWorld(
    "myTestApi", {
        showRSS: showRSS,
        getCOVIDData: getCOVIDData,
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
