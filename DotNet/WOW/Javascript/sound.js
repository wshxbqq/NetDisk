var s=window.sound = {};
s.playAttack = function () {
    //   var media = new Media(src, mediaSuccess, [mediaError], [mediaStatus]);
   // media.play();
    return;
    var index = 1 + window.parseInt(Math.random() * 5);
    var audio = new Audio();
    audio.src = "Source/sound/attack" + index + ".ogg";
    audio.preload = true;
    audio.play();
};

s.playDie = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/die.ogg";
    audio.preload = true;
    audio.play();
};

s.playHit = function () {
    return;
    var index = 1 + window.parseInt(Math.random() * 5);
    var audio = new Audio();
    audio.src = "Source/sound/hit" + index + ".ogg";
    audio.preload = true;
    audio.play();

}
s.playXiee = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/xiee.ogg";
    audio.preload = true;
    audio.play();
}

s.playShenji = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/shenji.ogg";
    audio.preload = true;
    audio.play();
}

s.playShiXue = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/shixue.ogg";
    audio.preload = true;
    audio.play();
}

s.playQiege = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/qiege.ogg";
    audio.preload = true;
    audio.play();
}

s.playTigu = function () {
    return;
    var audio = new Audio();
    audio.src = "Source/sound/tigu.ogg";
    audio.preload = true;
    audio.play();
}