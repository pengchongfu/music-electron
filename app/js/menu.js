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
        label: '查看音乐路径',
        click: openPathWin
      },
      {
        type: 'separator'
      },
      {
        label: '添加音乐路径',
        click: addPath
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
              body.css('background','#f0e68c');
            }
          },
          {
            label:"暗色",
            click:function(){
              body.css('background','#a9a9a9');
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
  dialog.showOpenDialog(BrowserWindow.getFocusedWindow(),{ properties: [ 'openDirectory', 'multiSelections' ]},function(addPaths){
    addPaths=addPaths.map(function(item){
      return item+='/';
    });
  
    var originPaths=JSON.parse(fs.readFileSync('./path.json')).path;
    addPaths=addPaths.filter(function(item){
      return originPaths.indexOf(item)===-1;
    });
    if(addPaths.length){
      fs.writeFileSync('./path.json',JSON.stringify({path:originPaths.concat(addPaths)}));
      init();
    }
  });
  
}

function openPathWin(){
  if(pathWin)return;
  pathWin = new BrowserWindow({ width: 300, height: 600,minWidth:300,minHeight:600});
  pathWin.loadURL('file://'+__dirname+'/pathWin.html');
  pathWin.setMenu(null);
  Menu.setApplicationMenu(null);
  var originPaths=JSON.parse(fs.readFileSync('./path.json')).path;
  pathWin.on('closed',function(){
    pathWin=null;
    Menu.setApplicationMenu(menu);
    var afterPaths=JSON.parse(fs.readFileSync('./path.json')).path;
    if(afterPaths.toString()!==originPaths.toString())init();
  })
}