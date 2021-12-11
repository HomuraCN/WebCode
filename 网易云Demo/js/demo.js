var keyWord;
var songArray = [];
var songUrlArray = [];
var songCoverArray = [];
var hotCommentsArray = [];
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
    document.getElementById("audioControler").src = songUrlArray[index].url;
    showSongComment(index);
    changeSongCover(index);
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