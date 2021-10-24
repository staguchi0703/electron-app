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
const { app, BrowserWindow, Menu, MenuItem, ipcMain, dialog } = require('electron');
const path = require('path');
function createWindow(renderer_process) {
    let win = new BrowserWindow({
        width: 1200,
        height: 600,
        backgroundColor: '#EEEEEE',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
            //nodeIntegrationとremoteモジュールの仕様が禁止された
        }
    });
    win.loadFile(renderer_process);
    win.webContents.openDevTools();
}
function createMenu() {
    let menu_temp = [
        {
            label: 'custom',
            submenu: [
                {
                    label: 'open new window',
                    click: () => {
                        console.log('New menu.');
                        app.whenReady().then(createWindow.bind(null, './renderer/newWindow.html'));
                    }
                },
                { role: 'close' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'debug',
            submenu: [
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'forceReload' },
                { role: 'editMenu' },
                { role: 'togglefullscreen' },
            ]
        }
    ];
    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}
function contextMenuMain() {
    ipcMain.handle("popupMenu", (event) => {
        const menu = new Menu();
        menu.append(new MenuItem({
            label: 'do func',
            click: () => {
                const w = BrowserWindow.getFocusedWindow();
                w.webContents.send("popup-return");
            }
        }));
        menu.popup({ window: BrowserWindow.getFocusedWindow() });
    });
}
function playWavFile() {
    ipcMain.handle("playWavFile", (event) => __awaiter(this, void 0, void 0, function* () {
        const w = BrowserWindow.getFocusedWindow();
        let waveFilePath = dialog.showOpenDialogSync(w, {
            properties: ['openFile'],
            filters: [
                {
                    name: 'Wav file',
                    extensions: ['wav']
                }
            ],
            defaultPath: "./"
        });
        if (waveFilePath != undefined) {
            console.log(waveFilePath[0]);
            return waveFilePath[0];
        }
        else {
            return "undefined";
        }
    }));
}
playWavFile();
contextMenuMain();
createMenu();
app.whenReady().then(createWindow.bind(null, './renderer/index.html'));
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
//# sourceMappingURL=index.js.map