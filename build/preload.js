"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const { ipcRenderer, contextBridge } = require('electron');
const config = require('config');
const zmq = require('zeromq');
const fs = require('fs');
// const { Buffer } = require('buffer');
function addChildCreate(child) {
    let elm = document.getElementById("msg");
    elm.appendChild(child);
}
function send_msg() {
    function runClient() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Connecting to hello world server…');
            //  Socket to talk to server
            const sock = new zmq.Request();
            const server = config.get('server');
            sock.connect('tcp://' + server.host + ':' + server.port);
            console.log('Sending Hello ');
            yield sock.send('Hello');
            const [result] = yield sock.receive();
            let res = result.toString();
            console.log('Received ', res);
            var elm = document.getElementById("msg");
            var child = document.createElement("div");
            child.innerHTML = res;
            elm.appendChild(child);
        });
    }
    runClient();
}
function subZmq() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const sock = new zmq.Subscriber;
        sock.connect("tcp://127.0.0.1:3000");
        sock.subscribe("kitty cats");
        console.log("Subscriber connected to port 3000");
        try {
            for (var sock_1 = __asyncValues(sock), sock_1_1; sock_1_1 = yield sock_1.next(), !sock_1_1.done;) {
                const [topic, message] = sock_1_1.value;
                console.log("received a message related to:", topic.toString(), "containing message:", message.toString());
                var elm = document.getElementById("msg");
                var child = document.createElement("div");
                child.innerHTML = message.toString();
                elm.appendChild(child);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sock_1_1 && !sock_1_1.done && (_a = sock_1.return)) yield _a.call(sock_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        ;
    });
}
contextBridge.exposeInMainWorld("myTestApi", {
    subZmq: subZmq,
    send_msg: send_msg,
    addChildCreate: addChildCreate,
    playWavFile: () => __awaiter(void 0, void 0, void 0, function* () { return yield ipcRenderer.invoke("playWavFile"); }),
    popupMenu: (data) => ipcRenderer.invoke("popupMenu", data),
    // メイン → レンダラー
    on: (channel, callback) => ipcRenderer.on(channel, (event, argv) => callback(event, argv))
});
//# sourceMappingURL=preload.js.map