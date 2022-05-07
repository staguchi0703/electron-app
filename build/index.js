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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const rss_parser_1 = __importDefault(require("rss-parser"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// open({
//     filename: './database/database.db',
//     driver: sqlite3.Database
//   }).then((db) => {
//     const query = `
//             create table if not exists users_tbl
//             (
//                 id integer primary key autoincrement,
//                 name text not null,
//                 mail text,
//                 tel text
//             )
//     `
//     db.run(query);
//     dialog.showMessageBox({
//         message: "create users table"
//     })
//     db.close();
// })
function doQuery(query) {
    return new Promise((resolve, reject) => {
        (0, sqlite_1.open)({
            filename: './database/database.db',
            driver: sqlite3_1.default.Database
        }).then((db) => {
            let res = db.exec(query);
            electron_1.dialog.showMessageBox({
                message: "query done."
            });
            resolve(res);
            db.close();
        });
    });
}
;
electron_1.ipcMain.on("doQuery", (event, query) => {
    doQuery(query).then((res) => {
        console.log(res);
        const w = electron_1.BrowserWindow.getFocusedWindow();
        w === null || w === void 0 ? void 0 : w.webContents.send("doQuery-result", res);
    });
});
const win_name = [
    "banana", "orange", "apple"
];
electron_1.ipcMain.on("hello", (event) => {
    console.log("get message.");
    const result = createWindow();
    console.log("result is " + String(result));
    event.reply('hello-result', win_name[result % 3] + '-' + result);
});
electron_1.ipcMain.on("getFilePath", (event) => {
    const w = electron_1.BrowserWindow.getFocusedWindow();
    try {
        const filename = electron_1.dialog.showOpenDialogSync(w, {
            properties: ['openFile'],
            filters: [
                { name: 'Text Files', extensions: ['txt', 'text', 'log'] }
            ]
        });
        event.reply("res-filePath", String(filename));
    }
    catch (_a) {
        console.error("can't read file");
        event.reply("res-filePath", "Can't read file.");
    }
});
electron_1.ipcMain.on("get-json-data", (event, urldata) => {
    const request = electron_1.net.request(urldata);
    let data = "";
    request.on('response', (response) => {
        response.on('data', (ck) => {
            data += ck;
        });
        response.on('end', () => {
            console.log(data);
            let json_obj = JSON.parse(data);
            console.log(json_obj);
            const w = electron_1.BrowserWindow.getFocusedWindow();
            w === null || w === void 0 ? void 0 : w.webContents.send("get-json-data-result", json_obj);
        });
    });
    request.end();
});
electron_1.ipcMain.on("getRSS", (event, url) => {
    const parser = new rss_parser_1.default();
    let list = '<ul class="list-group">';
    parser.parseURL(url, (err, feed) => {
        if (err == null) {
            for (let n in feed.items) {
                let item = feed.items[n];
                list += '<li class="list-group-item">' + item.title + ' (' + item.pubDate + ')</li>';
            }
            list += '</ul>';
            const w = electron_1.BrowserWindow.getFocusedWindow();
            w === null || w === void 0 ? void 0 : w.webContents.send("getRSS-result", list);
        }
    });
});
function createWindow() {
    let w = new electron_1.BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: path.join(electron_1.app.getAppPath(), './build/preload.js')
        }
    });
    w.loadFile('./renderer/index.html');
    w.webContents.openDevTools();
    return w.id;
}
function createMenu() {
    const menu_temp = [];
    menu_temp.push({
        label: 'undo',
        accelerator: 'commandOrControl+Z',
        role: 'undo'
    });
    let counter = 0;
    menu_temp.push({
        "label": "hello",
        click: () => {
            const w = electron_1.BrowserWindow.getFocusedWindow();
            w === null || w === void 0 ? void 0 : w.webContents.send("hello", "message from app.(" + ++counter + " count)");
        }
    });
    menu_temp.push({
        label: "New Menu",
        submenu: [
            {
                label: "New",
                click: () => {
                    console.log("new menu.");
                    createWindow();
                }
            },
            { role: "close" },
            { type: "separator" },
            { role: "quit" }
        ]
    });
    let menu = electron_1.Menu.buildFromTemplate(menu_temp);
    electron_1.Menu.setApplicationMenu(menu);
}
createMenu();
electron_1.app.whenReady().then(createWindow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5RTtBQUN6RSwyQ0FBNkI7QUFDN0IsNERBQWdDO0FBQ2hDLHNEQUE2QjtBQUM3QixtQ0FBNkI7QUFHN0IsU0FBUztBQUNULDBDQUEwQztBQUMxQywrQkFBK0I7QUFDL0Isc0JBQXNCO0FBQ3RCLHNCQUFzQjtBQUN0QixtREFBbUQ7QUFDbkQsZ0JBQWdCO0FBQ2hCLHdEQUF3RDtBQUN4RCxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixnQkFBZ0I7QUFDaEIsUUFBUTtBQUNSLHFCQUFxQjtBQUNyQiw4QkFBOEI7QUFDOUIsd0NBQXdDO0FBQ3hDLFNBQVM7QUFDVCxrQkFBa0I7QUFFbEIsS0FBSztBQUdMLFNBQVMsT0FBTyxDQUFDLEtBQWE7SUFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUVuQyxJQUFBLGFBQUksRUFBQztZQUNELFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsTUFBTSxFQUFFLGlCQUFPLENBQUMsUUFBUTtTQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLGlCQUFNLENBQUMsY0FBYyxDQUFDO2dCQUNsQixPQUFPLEVBQUUsYUFBYTthQUN6QixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUFBLENBQUM7QUFFRixrQkFBTyxDQUFDLEVBQUUsQ0FBQyxTQUFT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