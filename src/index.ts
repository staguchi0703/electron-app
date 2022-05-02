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
    let w = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), './build/preload.js')
        }
    });

    w.loadFile('./renderer/index.html')
    w.webContents.openDevTools();

    dialog.showErrorBox("Caution", "you clone the main window.")
    return w.id
}

function createMenu() {

    const menu_temp: Electron.MenuItemConstructorOptions[] = [];
    menu_temp.push({ 
        label: 'undo',
        accelerator: 'commandOrControl+Z',
        role: 'undo' 
    });

    let counter = 0;
    menu_temp.push({
        "label": "hello",
        click: () => {
            const w = BrowserWindow.getFocusedWindow();
            w?.webContents.send("hello", "message from app.(" + ++counter + " count)")
        }
    })

    menu_temp.push({
        label: "New Menu",
        submenu: [
            {
                label: "New",
                click: () => {
                    console.log("new menu.")
                    createWindow();
                }
            },
            {role: "close"},
            {type: "separator"},
            {role: "quit"}
        ]
    })

    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}


function showDialog() {
    let w = BrowserWindow.getFocusedWindow()!;
    let btns = ["aaa", "bbbb", "ccccc"]
    let re = dialog.showMessageBoxSync(w, {
        title: "sample title",
        message:"sample message",
        detail: "tttttttt",
        buttons: btns
    });
    dialog.showMessageBox(w, {
        title: "sample title",
        message:"sample message",
        detail: btns[re],
    })
}

ipcMain.handle("showDialog", (event) => {
    showDialog();
})

createMenu();

app.whenReady().then(createWindow);
