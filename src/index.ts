import { app, BrowserWindow, Menu, ipcMain, dialog} from 'electron';
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


ipcMain.on("getFilePath", (event: Electron.IpcMainEvent) => {
    const w = BrowserWindow.getFocusedWindow()!;
    const filename = dialog.showOpenDialogSync(w, {
        properties: ['openFile'],
        filters: [
            {name: 'Text Files', extensions: ['txt', 'text', 'log']}
        ]
    })
    event.reply("res-filePath", String(filename))

})


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





createMenu();

app.whenReady().then(createWindow);
