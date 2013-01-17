
/*
songList=[{storyName:"第一回","storyID":"1"},{}]
eventObjeventObj:{playing:function(){},pause:function(){}}

*/


window.ISO_Global_Player = new Audio();

var Player = window.Player = function (songList) {
    this.audio = window.ISO_Global_Player;
    this.volume = 50;
    this.playList = songList;
    this.playIndex = 0;
    this.storyName;
    this.url;
    this.TotalTime;
    this.status = "pause";
};
Player.prototype.load = function () {
    this.url = this.playList[this.playIndex].path;
    this.storyName = this.playList[this.playIndex].storyName;
    this.audio.src = this.url;
    this.audio.load();
};

Player.prototype.init = function () {
    var _this = this;
    var eventObj = this.eventObj;
    this.audio.addEventListener("ended", function (arg) {
        _this.nextSong();
    }, false);
}
Player.prototype.nextSong = function () {
    var _this = this;
    if (_this.playIndex >= (this.playList.length - 1)) {
        return;
    }
    _this.playIndex++;
    _this.load();
    _this.play()
    $("#story_header h2").html(_this.storyName);
}
Player.prototype.preSong = function () {
    var _this = this;
    if (_this.playIndex<=0) {
        return;
    }
    _this.playIndex--;
    _this.load();
    _this.play()
    $("#story_header h2").html(_this.storyName);
}

Player.prototype.play = function () {
    this.audio.play();
    $(".playSong").addClass("pauseSong");
    this.status = "play";
};
Player.prototype.pause = function () {
    this.audio.pause();
    $(".playSong").removeClass("pauseSong");
    this.status = "pause";
}

Player.prototype.stop = function () {
    if (this.audio.currentTime != 0) {
        this.audio.currentTime = 0
    }
    this.audio.pause();
}

Player.prototype.setMute = function (a) {
    this.audio.muted = a
}

Player.prototype.setVolume = function (a) {

    a = T.lang.isNumber(a) ? a : 50;
    a = Math.max(Math.min(a, 100), 0);
    this.volume = a;
    this.audio.volume = a / 100
}
Player.prototype.setCurrentPosition = function (b) {
    this.audio.currentTime = b / 1000;
}
Player.prototype.getCurrentPosition = function () {
    return Math.round(this.audio.currentTime * 1000)
}
Player.prototype.getLoadedPercent = function () {
    try {
        var a = this.audio.buffered.end(0),
                b = this.audio.duration;
        b = isNaN(b) ? 0 : b;
        return Math.round(a / b * 100) / 100
    } catch (c) {
        return 0
    }
}

Player.prototype.getTotalTime = function () {
    var a = this.audio.duration;
    a = isNaN(a) ? 0 : a;
    return Math.round(a * 1000)
}

Player.prototype.getState = function () {
    return this.state
}

Player.prototype.dispose = function () {
    this.stop();
    window.songPlayer = null;

}