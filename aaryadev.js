///////////////////////AARYADEV///////////////////

var settingpl = document.getElementById("playlength");
var settingrt = document.getElementById("rewindtime");
var mp3file = document.getElementById("file-input");
window.onload = init()
//local Storage//


//states
var isFS=false;

var au = document.getElementById("auplay");

var isPaused = false;


mp3file.onchange = function(){
console.log(mp3file.files[0]);
au.setAttribute('src',URL.createObjectURL(mp3file.files[0]));
au.controls = true;
au.play();
au.onpause = function(){
  isPaused= true;
}
au.onplay= function(){
  isPaused= false;
}
setInterval(function() {
  if(isPaused){

  }else{
    au.currentTime = au.currentTime-localStorage.rt;
    au.play();
  }


  }, (localStorage.pl*1000));

}

function ff(){
  au.currentTime = au.currentTime+2;
  au.play();
}
function rw(){
  if(au.currentTime > 2){
  au.currentTime = au.currentTime-2;
  au.play();
}
}

function contentsave(){
  var txtdata =document.getElementById("content").innerHTML;
  localStorage.txtdata = txtdata;
}


function setting(){
  document.getElementById('settings').style.display='block';
    settingpl.setAttribute('value',localStorage.pl);
    settingrt.setAttribute('value',localStorage.rt);

}
function savesetting(){
  var playlength = parseInt(settingpl.value);
  var rewindtime = parseInt(settingrt.value);
  var settingflag = false;
  if(Number.isInteger(playlength)){
    localStorage.pl = playlength;
    settingflag = true;
  }else{
    showmsg("Play length in Sec 10,15,20..");
    settingflag = false;
  }
  if(Number.isInteger(rewindtime)){
    localStorage.rt = rewindtime;
    settingflag = true;
  }else{
    showmsg("Rewind time 10,15,20..");
    settingflag = false;
  }
  if(settingflag){
    closesetting();
  }
}

function closesetting(){
    document.getElementById('settings').style.display='none';
}

function init(){
console.log("lets start");
//get setting values
if(localStorage.pl){
console.log("value " +localStorage.pl );
}else{
  settingpl.setAttribute('value','0');
  console.log("value not set");
  setting();
}
if(localStorage.rt){
settingrt.setAttribute('value','0');
console.log("value " +localStorage.rt);
}else{
  console.log("value not set");
  setting();
}
if(localStorage.txtdata == null || localStorage.txtdata == undefined){
document.getElementById("content").innerHTML= '  <div class="mdl-card__supporting-text" contenteditable="true" id="content" onkeyup="contentsave()"></div>';
}else{
  document.getElementById("content").innerHTML = localStorage.txtdata;
}



window.onhelp = function() {
    return false;
};
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
      if(isPaused){
        au.play();
      }else{
        au.pause();
      }
    }

    if(evt.key =="F9"){
      rw();
    }
    if(evt.key == "F10"){
      ff();
    }
};
}

function showmsg(msg){
  window['counter'] = 0;
  var snackbarContainer = document.querySelector('#toast');
  var showToastButton = document.querySelector('#demo-show-toast');

    var data = {message: msg};

snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
