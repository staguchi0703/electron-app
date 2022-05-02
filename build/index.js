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
    let win = new electron_1.BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: path.join(electron_1.app.getAppPath(), './build/preload.js')
        }
    });
    win.loadFile('./renderer/index.html');
    win.webContents.openDevTools();
    return win.id;
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
    let menu = electron_1.Menu.buildFromTemplate(menu_temp);
    electron_1.Menu.setApplicationMenu(menu);
}
createMenu();
electron_1.app.whenReady().then(createWindow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUErRTtBQUMvRSwyQ0FBNkI7QUFHN0IsTUFBTSxRQUFRLEdBQUc7SUFDYixRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU87Q0FDOUIsQ0FBQztBQUVGLGtCQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBRTtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzNCLE1BQU0sTUFBTSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBR0gsU0FBUyxZQUFZO0lBQ2pCLElBQUksR0FBRyxHQUFHLElBQUksd0JBQWEsQ0FBQztRQUN4QixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxHQUFHO1FBQ1gsY0FBYyxFQUFFO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLG9CQUFvQixDQUFDO1NBQzdEO0tBQ0osQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ3JDLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDOUIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFBO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFVBQVU7SUFFZixNQUFNLFNBQVMsR0FBMEMsRUFBRSxDQUFDO0lBQzVELFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDWCxLQUFLLEVBQUUsTUFBTTtRQUNiLFdBQVcsRUFBRSxvQkFBb0I7UUFDakMsSUFBSSxFQUFFLE1BQU07S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNYLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDUixNQUFNLENBQUMsR0FBRyx3QkFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDM0MsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLG9CQUFvQixHQUFHLEVBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFBO1FBQzlFLENBQUM7S0FDSixDQUFDLENBQUE7SUFDRixJQUFJLElBQUksR0FBRyxlQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsZUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxVQUFVLEVBQUUsQ0FBQztBQUViLGNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMifQ==