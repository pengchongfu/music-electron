var fs = require('fs');
var ul=$('#ul');
var musicDirs;
init();

function init(){
  $("li").remove();
  musicDirs = JSON.parse(fs.readFileSync('./path.json')).path;
  musicDirs.map(function(item){
    ul.append("<li><button>Delete</button>  "+item+"</li>");
  });
  $('button').click(function(){
    var index=$('button').index(this);
    musicDirs.splice(index,1);
    fs.writeFileSync('./path.json',JSON.stringify({path:musicDirs}));
    init();
  });
}
