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
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const win_name = [
    "banana", "orange", "apple"
];
electron_1.ipcMain.on("hello", (event) => {
    console.log("get message.");
    const result = createWindow();
    console.log("result is " + String(result));
    event.reply('hello-result', win_name[result % 3] + '-' + result);
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
    electron_1.dialog.showErrorBox("Caution", "you clone the main window.");
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
function showDialog() {
    let w = electron_1.BrowserWindow.getFocusedWindow();
    let btns = ["aaa", "bbbb", "ccccc"];
    let re = electron_1.dialog.showMessageBoxSync(w, {
        title: "sample title",
        message: "sample message",
        detail: "tttttttt",
        buttons: btns
    });
    electron_1.dialog.showMessageBox(w, {
        title: "sample title",
        message: "sample message",
        detail: btns[re],
    });
}
electron_1.ipcMain.handle("showDialog", (event) => {
    showDialog();
});
createMenu();
electron_1.app.whenReady().then(createWindow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUErRTtBQUMvRSwyQ0FBNkI7QUFHN0IsTUFBTSxRQUFRLEdBQUc7SUFDYixRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU87Q0FDOUIsQ0FBQztBQUVGLGtCQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBRTtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzNCLE1BQU0sTUFBTSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBR0gsU0FBUyxZQUFZO0lBQ2pCLElBQUksQ0FBQyxHQUFHLElBQUksd0JBQWEsQ0FBQztRQUN0QixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxHQUFHO1FBQ1gsY0FBYyxFQUFFO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLG9CQUFvQixDQUFDO1NBQzdEO0tBQ0osQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFN0IsaUJBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLDRCQUE0QixDQUFDLENBQUE7SUFDNUQsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFBO0FBQ2YsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUVmLE1BQU0sU0FBUyxHQUEwQyxFQUFFLENBQUM7SUFDNUQsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNYLEtBQUssRUFBRSxNQUFNO1FBQ2IsV0FBVyxFQUFFLG9CQUFvQjtRQUNqQyxJQUFJLEVBQUUsTUFBTTtLQUNmLENBQUMsQ0FBQztJQUVILElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ1gsT0FBTyxFQUFFLE9BQU87UUFDaEIsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNSLE1BQU0sQ0FBQyxHQUFHLHdCQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMzQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLEdBQUcsRUFBRSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDOUUsQ0FBQztLQUNKLENBQUMsQ0FBQTtJQUVGLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDWCxLQUFLLEVBQUUsVUFBVTtRQUNqQixPQUFPLEVBQUU7WUFDTDtnQkFDSSxLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3hCLFlBQVksRUFBRSxDQUFDO2dCQUNuQixDQUFDO2FBQ0o7WUFDRCxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7WUFDZixFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7WUFDbkIsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0lBRUYsSUFBSSxJQUFJLEdBQUcsZUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLGVBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBR0QsU0FBUyxVQUFVO0lBQ2YsSUFBSSxDQUFDLEdBQUcsd0JBQWEsQ0FBQyxnQkFBZ0IsRUFBRyxDQUFDO0lBQzFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNuQyxJQUFJLEVBQUUsR0FBRyxpQkFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRTtRQUNsQyxLQUFLLEVBQUUsY0FBYztRQUNyQixPQUFPLEVBQUMsZ0JBQWdCO1FBQ3hCLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUNILGlCQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRTtRQUNyQixLQUFLLEVBQUUsY0FBYztRQUNyQixPQUFPLEVBQUMsZ0JBQWdCO1FBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ25CLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRCxrQkFBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNuQyxVQUFVLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUVGLFVBQVUsRUFBRSxDQUFDO0FBRWIsY0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyJ9