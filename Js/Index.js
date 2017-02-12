var timeControl = document.getElementById("begin");
var currentPlay = document.getElementById("tspan22");
var durationVar = document.getElementById("path27");
var minutes;
var myseconds;
var mySong;
var audioRecord;
var songDuration;
var cutInit;
var cutFinal;

function playSong(element, element2) {
    if (mySong != null) {
        mySong.load();
        $("td").css("background-color", "#cccccc");
        $("td").css("color", "#333");
    }
    element2.style.backgroundColor = "darkred";
    element2.style.color = "white";
    mySong = new Audio('Audio/' + element + '.mp3');
    mySong.addEventListener('loadedmetadata', function() {
        var audioRecord = mySong.ontimeupdate = function() {
            seconds();
        };
        songDuration = Math.floor(mySong.duration);
        minutes = parseInt(songDuration / 60, 10);
        myseconds = parseInt(songDuration % 60);
        currentPlay.innerHTML = minutes + ":" + myseconds;
    });
    mySong.play();
    seconds();
    createTrack(element);
}

function pauseSong() {
    mySong.pause();
}

function stopSong() {
    mySong.load();
}

function playTheSong() {
    mySong.play();
}

function seconds() {
    var time = Math.floor(mySong.currentTime);
    durationVar.setAttribute("cx", 65 + time * (75 / songDuration));
    timeControl.innerHTML = " 00:" + time + " /";
}

function init(){
    cutInit = (Math.floor(mySong.currentTime));
}

function final(){
    cutFinal = (Math.floor(mySong.currentTime));
}


function createTrack(element){
    var trackList = document.getElementById("tablita");
    var newTr = document.createElement("tr");
    var newTd = document.createElement("td");
    var newTitle = document.createTextNode("New song from track " + element);
    newTd.onclick= newTrack();
    newTd.appendChild(newTitle);
    newTr.appendChild(newTd);
    trackList.appendChild(newTr);

}

function newTrack(){
    mySong.currentTime = cutInit;
    mySong.play();
    if(mySong.currentTime == cutFinal){
        mySong.load();
    }
}
