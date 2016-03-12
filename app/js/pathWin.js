var fs = require('fs');
var ul=$('#ul');
var musicDirs = JSON.parse(fs.readFileSync('./path.json')).path;

musicDirs.map(function(item){
  ul.append("<li>"+item+"<button>删除</button>"+"</li>");
});

$('button').click(function(){
  var index=$('button').index(this);
  musicDirs.splice()
  
  
})

  // fs.writeFileSync('./path.json',JSON.stringify({path:originPaths.concat(addPaths)}));