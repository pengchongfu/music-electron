'use strict';

const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({width:800,height:600});
    
    //mainWindow.webContents.openDevTools();

    mainWindow.loadURL("file://"+__dirname+"/app/music.html");

}

app.on('ready',createWindow);
