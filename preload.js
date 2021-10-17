const { ipcRenderer, contextBridge } = require('electron');
const config = require('config');
const zmq = require('zeromq');
const fs = require('fs');


function addChildCreate(child) {
    var elm = document.getElementById("msg");
    elm.appendChild(child)
}

function send_msg() {
    async function runClient() {
        console.log('Connecting to hello world server…');

        //  Socket to talk to server
        const sock = new zmq.Request();
        const server = config.get('server')
        sock.connect('tcp://' + server.host + ':' + server.port);

        console.log('Sending Hello ');
        await sock.send('Hello');
        const [result] = await sock.receive();
        res = result.toString();
        console.log('Received ', res);
        var elm = document.getElementById("msg");
        var child = document.createElement("div");
        child.innerHTML = res
        elm.appendChild(child);

    }
    runClient();
}




contextBridge.exposeInMainWorld(
    "myTestApi", {
    zmq: zmq,
    send_msg: send_msg,
    addChildCreate: addChildCreate,
    playWavFile: async () =>  await ipcRenderer.invoke("playWavFile"),
    popupMenu: (data) => ipcRenderer.invoke("popupMenu", data),
    // メイン → レンダラー
    on: (channel, callback) =>
        ipcRenderer.on(channel, (event, argv) => callback(event, argv))
}
);