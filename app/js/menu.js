const remote = require('electron').remote;
const Menu = remote.Menu;

var template = [
  {
    label: '音乐路径',
    submenu: [
      {
        label: '查看所有音乐路径'
      },
      {
        type: 'separator'
      },
      {
        label: '添加音乐路径'
      },
      {
        type: 'separator'
      },
      {
        label: "刷新列表",
        click: function(){
          init();
        }
      }
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