"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
function getSampleTxtPath() {
    electron_1.ipcRenderer.send("getFilePath");
}
function showRSS(url, elm) {
    electron_1.ipcRenderer.send("getRSS", url);
    electron_1.ipcRenderer.on("getRSS-result", (event, data) => {
        elm.innerHTML = data;
    });
}
function getCOVIDData(url, elm) {
    const urldata = {
        method: "GET",
        protocol: "https:",
        hostname: "filesamples.com",
        port: 443,
        path: "/samples/code/json/sample2.json"
    };
    electron_1.ipcRenderer.send("get-json-data", urldata);
    electron_1.ipcRenderer.on("get-json-data-result", (event, data) => {
        elm.innerHTML = jsonToTable(data);
    });
}
function jsonToTable(json) {
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
function doQuery(query) {
    electron_1.ipcRenderer.send("doQuery", query);
}
electron_1.contextBridge.exposeInMainWorld("myTestApi", {
    doQuery: doQuery,
    showRSS: showRSS,
    getCOVIDData: getCOVIDData,
    createWindow: () => __awaiter(void 0, void 0, void 0, function* () {
        return electron_1.ipcRenderer.invoke("createWindow").then(() => {
            let elm = document.querySelector("#msg_any");
            elm.textContent = "createWindw";
        });
    }),
    send_hello: () => __awaiter(void 0, void 0, void 0, function* () { return electron_1.ipcRenderer.send("hello"); }),
    getSampleTxtPath: getSampleTxtPath,
    fs: fs,
    // メイン → レンダラー
    on: (channel, callback) => electron_1.ipcRenderer.on(channel, (event, argv) => callback(event, argv))
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmVsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNkQ7QUFDN0QsdUNBQXlCO0FBRXpCLFNBQVMsZ0JBQWdCO0lBQ3JCLHNCQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFHRCxTQUFTLE9BQU8sQ0FBQyxHQUFVLEVBQUUsR0FBVztJQUNwQyxzQkFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsc0JBQVcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzVDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEdBQVUsRUFBRSxHQUFXO0lBRXpDLE1BQU0sT0FBTyxHQUFHO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLGlDQUFpQztLQUMxQyxDQUFBO0lBRUQsc0JBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLHNCQUFXLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxFQUFFO1FBQ2xELEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQVE7SUFDekIsSUFBSSxLQUFLLEdBQUcsMkNBQTJDLENBQUM7SUFDeEQsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ2xCLEtBQUssSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztTQUNqQztRQUNELE1BQU07S0FDUDtJQUNELEtBQUssSUFBSSxzQkFBc0IsQ0FBQztJQUNoQyxLQUFLLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtRQUNuQixLQUFLLElBQUksVUFBVSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDbkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ2xCLEtBQUssSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUNyQztRQUNELEtBQUssSUFBSSxPQUFPLENBQUM7S0FDbEI7SUFDRCxLQUFLLElBQUksa0JBQWtCLENBQUM7SUFDNUIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLEtBQWE7SUFDMUIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3RDLENBQUM7QUFHRCx3QkFBYSxDQUFDLGlCQUFpQixDQUMzQixXQUFXLEVBQUU7SUFDVCxPQUFPLEVBQUUsT0FBTztJQUNoQixPQUFPLEVBQUUsT0FBTztJQUNoQixZQUFZLEVBQUUsWUFBWTtJQUMxQixZQUFZLEVBQUUsR0FBUSxFQUFFO1FBQUMsT0FBQSxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1lBQ2pFLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFFLENBQUE7WUFDN0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUE7TUFBQTtJQUNGLFVBQVUsRUFBRSxHQUFRLEVBQUUsa0RBQUMsT0FBQSxzQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxHQUFBO0lBQ2hELGdCQUFnQixFQUFFLGdCQUFnQjtJQUNsQyxFQUFFLEVBQUUsRUFBRTtJQUNOLGNBQWM7SUFDZCxFQUFFLEVBQUUsQ0FBQyxPQUFZLEVBQUUsUUFBYSxFQUFFLEVBQUUsQ0FDaEMsc0JBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNoRixDQUVKLENBQUMifQ==