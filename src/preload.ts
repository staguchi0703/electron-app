const { ipcRenderer, contextBridge } = require('electron');
const config = require('config');
const zmq = require('zeromq');
const fs = require('fs');
// const { Buffer } = require('buffer');


function addChildCreate(child: any) {
    let elm = document.getElementById("msg")!;
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
        let res = result.toString();
        console.log('Received ', res);
        var elm = document.getElementById("msg")!;
        var child = document.createElement("div");
        child.innerHTML = res
        elm.appendChild(child);

    }
    runClient();
}

async function subZmq() {
    const sock = new zmq.Subscriber;

    sock.connect("tcp://127.0.0.1:3000");
    sock.subscribe("kitty cats");
    console.log("Subscriber connected to port 3000");


    for await (const [topic, message] of sock) {
        console.log(
            "received a message related to:",
            topic.toString(),
            "containing message:",
            message.toString()

        );
        var elm = document.getElementById("msg")!;
        var child = document.createElement("div");
        child.innerHTML = message.toString()
        elm.appendChild(child);
    };

}

contextBridge.exposeInMainWorld(
    "myTestApi", {
    subZmq: subZmq,
    send_msg: send_msg,
    addChildCreate: addChildCreate,
    playWavFile: async () => await ipcRenderer.invoke("playWavFile"),
    popupMenu: (data: any) => ipcRenderer.invoke("popupMenu", data),
    // メイン → レンダラー
    on: (channel: any, callback: any) =>
        ipcRenderer.on(channel, (event: any, argv: any) => callback(event, argv))
}
);