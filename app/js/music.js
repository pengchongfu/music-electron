var playList=[];
var musicIcon=$("#musicIcon");
var playState=document.getElementById("playState");
var leftTime=document.getElementById("leftTime");
var process=$("#process");
var bar=$('#bar');
var previousButton=document.getElementById("previousButton");
var switchButton=document.getElementById("switchButton");
var playButton=document.getElementById("playButton");
var pauseButton=document.getElementById("pauseButton");
var nextButton=document.getElementById("nextButton");
var listButton=document.getElementById("listButton");
var list=$("#list");

//获取音乐列表信息
// (function(){
//   $.ajax(
//       {
//         url:'/',
//         type:'POST',
//         async:false,
//         success:function(data){
//           console.log("获取音乐列表成功");
//           playList=data;
//           console.log(playList);
//         },
//         error:function(){
//           console.log("获取音乐列表失败");
//         }
//       }
//   );
// })();

//同步函数，获取本地音乐
var fs =require("fs");
var musicDir='/home/pcf/Music/';
var audio=document.createElement("audio");
init();

function init(){
  playList=fs.readdirSync(musicDir);
  $('ul li').remove();
  playList.map(function(item){
      list.append("<li>"+item+"</li>");
  });
  
  $("ul li").click(function(){
    if(audio.index===$(this).index()){
        audio.play();
        updateState();
        return;
    }
    audio.index=$(this).index();
    switchSong();
    updateState();
  });
  audio.index=0;
  audio.src=musicDir+playList[audio.index];
  updateState();
}

var refreshButton = $("#refreshButton");
refreshButton.click(function(){
  init();
});


process.click(changeProcess);
previousButton.addEventListener('click',previousSong);
switchButton.addEventListener("click",playOrPause);
nextButton.addEventListener("click",nextSong);
listButton.addEventListener("click",function(){
    list.css("display")==="block"?list.css("display","none"):list.css("display","block");
});
function changeProcess(e){
    var persent=(e.pageX-process.offset().left)/process.width();
    audio.currentTime=audio.duration*persent;
    bar.css("width",persent*100+"%");
}

function previousSong(){
    audio.index-1<0?audio.index=playList.length-1:audio.index-=1;
    switchSong();
    updateState();
}

function playOrPause(){
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
    updateState();
}

function nextSong(){
    audio.index+1<playList.length?audio.index+=1:audio.index=0;
    switchSong();
    updateState();
}

function switchSong(){
    audio.src=musicDir+playList[audio.index];
    audio.play();
}

function updateState(){
    var index=audio.index;
    var arr=$("ul li");
    arr.css("color","#000");
    $(arr[index]).css("color","#eee");
    if(audio.paused){
        playButton.style.display="inline-block";
        pauseButton.style.display="none";
        playState.innerHTML=playList[audio.index];
        musicIcon.css("animation-play-state","paused");
    }
    else{
        playButton.style.display="none";
        pauseButton.style.display="inline-block";
        playState.innerHTML=playList[audio.index];
        musicIcon.css("animation-play-state","running");
    }
}


audio.addEventListener("ended",function(){
    nextSong();
});

audio.addEventListener("timeupdate",function(){
    var persent=audio.currentTime/audio.duration;
    var left=audio.duration-audio.currentTime;
    var min=parseInt(left/60);
    var sec=parseInt(left%60);
    var str="-"+min+":"+sec;
    if(sec<10)str="-"+min+":0"+sec;
    if(isNaN(sec))str="-0:00";
    bar.css("width",persent*100+"%");
    leftTime.innerHTML=str;
});

function formatTime(second) {
    return [parseInt(second / 60 / 60), second / 60 % 60, second % 60].join(":")
        .replace(/\b(\d)\b/g, "0$1");
}