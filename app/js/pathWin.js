var fs = require('fs');
const remote = require('electron').remote;
const configPath=remote.process.env[(remote.process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var ul=$('#ul');
var musicDirs;
init();


function init(){
  $("li").remove();
  musicDirs = JSON.parse(fs.readFileSync(configPath+'/path.json')).path;
  musicDirs.map(function(item){
    ul.append("<li><button>Delete</button>  "+item+"</li>");
  });
  $('button').click(function(){
    var index=$('button').index(this);
    musicDirs.splice(index,1);
    fs.writeFileSync(configPath+'/path.json',JSON.stringify({path:musicDirs}));
    init();
  });
}
