'use strict';
var fs = require("fs");

const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
      width:300,
      height:600,
      minWidth:300,
      minHeight:600,
      maxWidth:300,
      maxHeight:600,
      });
    
    //mainWindow.webContents.openDevTools();

    mainWindow.loadURL("file://"+__dirname+"/app/music.html");
    
    mainWindow.on('closed',function(){
      app.quit();
    });

}

var configPath=process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
fs.exists(configPath+'/path.json',function(exist){
  if(!exist)fs.writeFileSync(configPath+'/path.json',JSON.stringify({path:[]}));
});

app.on('ready',createWindow);
