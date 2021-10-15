const { ipcRenderer, contextBridge } = require('electron');

const zmq = require('zeromq');

function addChildCreate(child) {
    var elm = document.getElementById("msg");
    elm.appendChild(child)
}

function send_msg() {
    async function runClient() {
        console.log('Connecting to hello world server…');

        //  Socket to talk to server
        const sock = new zmq.Request();
        sock.connect('tcp://192.168.11.5:5556');

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
    ipcRenderer: ipcRenderer,
    send_msg: send_msg,
    addChildCreate: addChildCreate
}
);