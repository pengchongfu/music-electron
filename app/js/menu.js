const remote = require('electron').remote;
const Menu = remote.Menu;
const dialog = remote.dialog;
const BrowserWindow = remote.BrowserWindow;

var pathWin = null;

var template = [
  {
    label: '音乐路径',
    submenu: [
      {
        label: '查看所有音乐路径',
        click:function(){
          openPathWin();
        }
      },
      {
        type: 'separator'
      },
      {
        label: '添加音乐路径',
        click: function(){
          addPath();
          init();
        }
      },
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: '主题',
        submenu:[
          {
            label:"亮色",
            click:function(){
              body.css('background','#ee2c2c');
            }
          },
          {
            label:"暗色",
            click:function(){
              body.css('background','#606060');
            }
          },
          {
            label:"默认",
            click:function(){
              body.css('background','#22c3aa');
            }
          }
        ]
      }
    ]
  },
  {
    label: '关于',
    submenu: [
      {
        label: 'Github',
        click: function() { require('electron').shell.openExternal('https://github.com/steinsphang/music-electron') }
      },
    ]
  },
];


var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function addPath(){
  var addPaths=dialog.showOpenDialog({ properties: [ 'openDirectory', 'multiSelections' ]});
  addPaths=addPaths.map(function(item){
    return item+='/';
  });
  
  var originPaths=JSON.parse(fs.readFileSync('./path.json')).path;
  addPaths=addPaths.filter(function(item){
    return originPaths.indexOf(item)===-1;
  });
  fs.writeFileSync('./path.json',JSON.stringify({path:originPaths.concat(addPaths)}));
}

function openPathWin(){
  if(pathWin)return;
  pathWin = new BrowserWindow({ width: 800, height: 600});
  pathWin.webContents.openDevTools();
  pathWin.loadURL('file://'+__dirname+'/pathWin.html');
  pathWin.on('closed',function(){
    pathWin=null;
  })
}