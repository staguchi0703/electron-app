import { app, BrowserWindow, Menu, MenuItem, ipcMain, dialog } from 'electron';
import * as path from 'path';


const win_name = [
    "banana", "orange", "apple"
];

ipcMain.on("hello", (event: Electron.IpcMainEvent) => {
    console.log("get message.")
    const result = createWindow();
    console.log("result is " + String(result));
    event.reply('hello-result', win_name[result % 3] + '-' + result)
});


function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), './build/preload.js')
        }
    });

    win.loadFile('./renderer/index.html')
    win.webContents.openDevTools()
    return win.id
}

function createMenu() {

    const menu_temp: Electron.MenuItemConstructorOptions[] = [];
    menu_temp.push({ 
        label: 'undo',
        accelerator: 'commandOrControl+Z',
        role: 'undo' 
    });
    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}

createMenu();

ipcMain.handle("createWindow", (event) => {
    createWindow();
})
app.whenReady().then(createWindow);
