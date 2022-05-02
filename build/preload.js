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
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("myTestApi", {
    createWindow: () => __awaiter(void 0, void 0, void 0, function* () {
        return electron_1.ipcRenderer.invoke("createWindow").then(() => {
            let elm = document.querySelector("#msg_any");
            elm.textContent = "createWindw";
        });
    }),
    send: electron_1.ipcRenderer.send,
    // メイン → レンダラー
    on: (channel, callback) => electron_1.ipcRenderer.on(channel, (event, argv) => callback(event, argv))
});
const _now = (0, console_1.time)();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmVsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscUNBQStCO0FBQy9CLHVDQUFzRDtBQUV0RCx3QkFBYSxDQUFDLGlCQUFpQixDQUMzQixXQUFXLEVBQUU7SUFDVCxZQUFZLEVBQUUsR0FBUSxFQUFFO1FBQUMsT0FBQSxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1lBQ2pFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFFLENBQUE7WUFDN0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUE7TUFBQTtJQUNGLElBQUksRUFBQyxzQkFBVyxDQUFDLElBQUk7SUFDckIsY0FBYztJQUNkLEVBQUUsRUFBRSxDQUFDLE9BQVksRUFBRSxRQUFhLEVBQUUsRUFBRSxDQUNoQyxzQkFBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFVLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2hGLENBRUosQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLElBQUEsY0FBSSxHQUFFLENBQUMifQ==