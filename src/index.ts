import { app, BrowserWindow, Menu, ipcMain, dialog, net} from 'electron';
import * as path from 'path';
import Parser from 'rss-parser';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


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


function doQuery(query: string) {
    return new Promise((resolve, reject) => {
        
        open({
            filename: './database/database.db',
            driver: sqlite3.Database
          }).then((db) => {
            let res = db.exec(query);
            dialog.showMessageBox({
                message: "query done."
            });
            resolve(res);
            db.close();
        })
    })
};

ipcMain.on("doQuery", (event, query) => {
   doQuery(query).then((res) => {
        console.log(res);       
        const w = BrowserWindow.getFocusedWindow();
        w?.webContents.send("doQuery-result", res);
   });


})


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
    try {
        const filename = dialog.showOpenDialogSync(w, {
            properties: ['openFile'],
            filters: [
                {name: 'Text Files', extensions: ['txt', 'text', 'log']}
            ]
        })
        event.reply("res-filePath", String(filename))

    } catch {
        console.error("can't read file");
        event.reply("res-filePath", "Can't read file.")
    }
})

ipcMain.on("get-json-data", (event, urldata) => {
    const request = net.request(urldata);
    
    let data = "";
    request.on('response', (response) => {
        response.on('data', (ck) => {
            data += ck
        });

        response.on('end', ()=>{
            console.log(data);
            let json_obj:JSON = JSON.parse(data);
            console.log(json_obj);
            const w = BrowserWindow.getFocusedWindow();
            w?.webContents.send("get-json-data-result", json_obj);
        })
    });
    request.end();
})

ipcMain.on("getRSS", (event, url)=>{
    const parser = new Parser();
    let list = '<ul class="list-group">';
    parser.parseURL(url, (err, feed) => {
        if (err == null) {
            for (let n in feed.items){
                let item = feed.items[n];
                list += '<li class="list-group-item">' + item.title + ' (' + item.pubDate + ')</li>';
            }
            list += '</ul>';
            const w = BrowserWindow.getFocusedWindow();
            w?.webContents.send("getRSS-result", list);
        }
    })

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
