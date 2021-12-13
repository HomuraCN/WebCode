var keyWord;
var songArray = [];
var songUrlArray = [];
var songCoverArray = [];
var hotCommentsArray = [];
var songLyrics = [];
var lyrics = [];
var timer = [];
var timeCounter = [];
var songIndex = 0;
var listIndex = 0;
function tabChange(index){
    if(index == 1){
        document.getElementById('tab1').style.display = "block";
        document.getElementById('tab2').style.display = "none";
    }
    else{
        document.getElementById('tab1').style.display = "none";
        document.getElementById('tab2').style.display = "block";
    }
}
function recordRotate(){
    document.getElementById('recordBar').style.transform = "rotate(0deg)";
    document.getElementById('recordCover').style.animationPlayState = "running";
    document.getElementById('recordDisc').style.animationPlayState = "running";
}
function recordReverse(){
    document.getElementById('recordBar').style.transform = "rotate(-30deg)";
    document.getElementById('recordCover').style.animationPlayState = "paused";
    document.getElementById('recordDisc').style.animationPlayState = "paused";
}
function playSong(index){
    songIndex = index;
    listIndex = 0;
    document.getElementById("audioControler").src = songUrlArray[index].url;
    showSongComment(index);
    changeSongCover(index);
    showLyrics(index);
}
function showSongList(){
    for(var i = 0; i < 6; i++){
        document.getElementsByClassName("subList")[i].innerHTML = '歌曲:' + songArray[i].name + ' 专辑: ' + songArray[i].album.name;
    }
}
function showSongComment(index){
    for(var i = 0; i < 6; i++){
        document.getElementsByClassName("subCommentList")[i].innerHTML = hotCommentsArray[index][i].content;
    }
}
function showLyrics(index){
    handleLyrics(index);
    var sublyricsNode = document.getElementsByClassName("sublyrics")[0];
    document.getElementById("songlyricsUl").innerHTML = "";
    for(var i = 0; i < lyrics[index].length; i++){
        var tempNode = sublyricsNode.cloneNode(true);
        tempNode.getElementsByClassName("sublyricsText")[0].textContent = lyrics[index][i];
        document.getElementById("songlyricsUl").appendChild(tempNode);
    }
    //document.getElementsByClassName("sublyrics")[0].innerHTML = songLyrics[index];
}
function changeSongCover(index){
    document.getElementById("recordCover").src = songCoverArray[index].al.picUrl;
}
function getKeyWord(){
    keyWord = document.getElementById("searchText").value;
    document.getElementById("searchText").value = "";
    getSongArray();
}
function getSongArray(){
    axios.get(
        "/search?keywords=" + keyWord
    ).then(
        response => {
            songArray = response.data.result.songs;
            for(var i = 0; i < 6; i++){
                getIndexSong(i);
            }
            showSongList();
        }
    )
}
function getIndexSong(index){
    getSongUrlArray(index);
    getSongCoverArray(index);
    getHotComments(index);
    getLyrics(index);
}
function getSongUrlArray(index){
    axios.get(
        "/song/url?id=" + songArray[index].id
    ).then(
        response => {
            songUrlArray[index] = response.data.data[0];
        }
    )
}
function getSongCoverArray(index){
    axios.get(
        "/song/detail?ids=" + songArray[index].id
    ).then(
        response => {
            songCoverArray[index] = response.data.songs[0];
        }
    )
}
function getHotComments(index){
    axios.get(
        "/comment/music?id=" + songArray[index].id
    ).then(
        response => {
            hotCommentsArray[index] = response.data.hotComments;
        }
    )
}
function getLyrics(index){
    axios.get(
        "/lyric?id=" + songArray[index].id
    ).then(
        response => {
            songLyrics[index] = '#';
            songLyrics[index] = response.data.lrc.lyric;
        }
    )
}
/*
function myFunction(){
	var lyrics = [];
	var timer = [];
	var str="[00:04.050]\n[00:12.570]难以忘记初次见你\n[00:16.860]一双迷人的眼睛\n[00:21.460]在我脑海里\n[00:23.960]你的身影 挥散不去\n[00:30.160]握你的双手感觉你的温柔\n[00:34.940]真的有点透不过气\n[00:39.680]你的天真 我想珍惜\n[00:43.880]看到你受委屈 我会伤心\n[00:48.180]喔\n[00:50.340]只怕我自己会爱上你\n[00:55.070]不敢让自己靠的太近\n[00:59.550]怕我没什么能够给你\n[01:04.030]爱你也需要很大的勇气\n[01:08.190]只怕我自己会爱上你\n[01:12.910]也许有天会情不自禁\n[01:17.380]想念只让自己苦了自己\n[01:21.840]爱上你是我情非得已\n[01:28.810]难以忘记初次见你\n[01:33.170]一双迷人的眼睛\n[01:37.700]在我脑海里 你的身影 挥散不去\n[01:46.360]握你的双手感觉你的温柔\n[01:51.120]真的有点透不过气\n[01:55.910]你的天真 我想珍惜\n[02:00.150]看到你受委屈 我会伤心\n[02:04.490]喔\n[02:06.540]只怕我自己会爱上你\n[02:11.240]不敢让自己靠的太近\n[02:15.750]怕我没什么能够给你\n[02:20.200]爱你也需要很大的勇气\n[02:24.570]只怕我自己会爱上你\n[02:29.230]也许有天会情不自禁\n[02:33.680]想念只让自己苦了自己\n[02:38.140]爱上你是我情非得已\n[03:04.060]什么原因 耶\n[03:07.730]我竟然又会遇见你\n[03:13.020]我真的真的不愿意\n[03:16.630]就这样陷入爱的陷阱\n[03:20.700]喔\n[03:22.910]只怕我自己会爱上你\n[03:27.570]不敢让自己靠的太近\n[03:32.040]怕我没什么能够给你\n[03:36.560]爱你也需要很大的勇气\n[03:40.740]只怕我自己会爱上你\n[03:45.460]也许有天会情不自禁\n[03:49.990]想念只让自己苦了自己\n[03:54.510]爱上你是我情非得已\n[03:58.970]爱上你是我情非得已\n[04:03.000]\n";
	var n=str.split("\n");
	for(var i = 0; i < n.length; i++){
		var temp1 = n[i].split("]");
		var temp2 = temp1;
		timer.push(temp2[0].substring(1));
		lyrics.push(temp1[1]);
	}
    var temp = timer[0].split(":");
	var tempMinute = parseInt(temp[0],10);
	var tempSecond = parseFloat(temp[1]);
	document.getElementById("demo").innerHTML=tempMinute;
	document.getElementById("demo").innerHTML=tempSecond;
	document.getElementById("demo").innerHTML=timer[0];
}
*/
function handleLyrics(index){
    timer[index] = new Array();
    lyrics[index] = new Array();
    timeCounter[index] = new Array();
    var temp = '#';
    var temp0 = '';
    temp = songLyrics[index];
    temp0 = temp.split("\n");
    for(var j = 0; j < temp0.length; j++){
        var temp1 = temp0[j].split("]");
        var temp2 = temp1;
        timer[index].push(temp2[0].substring(1));
        lyrics[index].push(temp1[1]);
    }
    for(var i = 0; i < timer[index].length; i++){
        var t = timer[index][i].split(":");
        var tempMinute = parseInt(t[0],10);
        var tempSecond = parseFloat(t[1]);
        timeCounter[index][i] = tempMinute * 60 + tempSecond;
    }
}
function highLight(){
    var audioObj = document.getElementById('audioControler');
    console.log(audioObj.currentTime + "#" + listIndex);
    if(audioObj.currentTime >= timeCounter[songIndex][listIndex] && audioObj.currentTime < timeCounter[songIndex][listIndex + 1]){
        for(var i = 0; i < timeCounter[songIndex].length; i++){
            document.getElementsByClassName("sublyricsText")[i].style.color = 'black';
        }
        document.getElementsByClassName("sublyricsText")[listIndex].style.color = 'red';
        /*document.getElementsByClassName("sublyricsText").style.color = 'black';
        document.getElementsByClassName("sublyricsText")[listIndex].style.color = 'red';*/
    }
    else if(audioObj.currentTime >= timeCounter[songIndex][listIndex]){
        listIndex++;
    }
    else {
        listIndex--;
    }
}