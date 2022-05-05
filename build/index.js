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
(0, sqlite_1.open)({
    filename: './database/database.db',
    driver: sqlite3_1.default.Database
}).then((db) => {
    const query = `
            create table if not exists users_tbl
            (
                id integer primary key autoincrement,
                name text not null,
                mail text,
                tel text
            )
    `;
    db.run(query);
    electron_1.dialog.showMessageBox({
        message: "create users table"
    });
    db.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5RTtBQUN6RSwyQ0FBNkI7QUFDN0IsNERBQWdDO0FBQ2hDLHNEQUE2QjtBQUM3QixtQ0FBNkI7QUFHN0IsSUFBQSxhQUFJLEVBQUM7SUFDRCxRQUFRLEVBQUUsd0JBQXdCO0lBQ2xDLE1BQU0sRUFBRSxpQkFBTyxDQUFDLFFBQVE7Q0FDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO0lBQ2IsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7O0tBUWIsQ0FBQTtJQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxpQkFBTSxDQUFDLGNBQWMsQ0FBQztRQUNsQixPQUFPLEVBQUUsb0JBQW9CO0tBQ2hDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUVmLENBQUMsQ0FBQyxDQUFBO0FBSUYsTUFBTSxRQUFRLEdBQUc7SUFDYixRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU87Q0FDOUIsQ0FBQztBQUVGLGtCQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBRTtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzNCLE1BQU0sTUFBTSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBR0gsa0JBQU8sQ0FBQyxF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