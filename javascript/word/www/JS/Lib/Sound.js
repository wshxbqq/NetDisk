/// <reference path="Common.js" />
(function () {
    var S = window.Sound = {};
    var C = window.Common;
        window.bg_audio=new Audio();
    window.bg_audio.loop=true;
    window.bg_audio.autoplay=true;
    window.bg_audio.src="R/Sound/random_"+C.getRandom(1, 12)+".mp3";
    var onSuccess=function(){};
    var onError=function(){};
    S.init=function(){
        S.bg_1=new Media("R/Sound/random_1.mp3", onSuccess, onError);
        S.bg_2=new Media("R/Sound/random_2.mp3", onSuccess, onError);
        S.bg_3=new Media("R/Sound/random_3.mp3", onSuccess, onError);
        S.bg_4=new Media("R/Sound/random_4.mp3", onSuccess, onError);
        S.bg_5=new Media("R/Sound/random_5.mp3", onSuccess, onError);
        S.bg_6=new Media("R/Sound/random_6.mp3", onSuccess, onError);
        S.bg_7=new Media("R/Sound/random_7.mp3", onSuccess, onError);
        S.bg_8=new Media("R/Sound/random_8.mp3", onSuccess, onError);
        S.bg_9=new Media("R/Sound/random_9.mp3", onSuccess, onError);
        S.bg_10=new Media("R/Sound/random_10.mp3", onSuccess, onError);
        S.bg_11=new Media("R/Sound/random_11.mp3", onSuccess, onError);
        S.bg_12=new Media("R/S0ound/random_12.mp3", onSuccess, onError);

        S.right=new Media("R/Sound/right.mp3", onSuccess, onError);
        S.wrong=new Media("R/Sound/wrong.mp3", onSuccess, onError);
        S.ding=new Media("R/Sound/ding.mp3", onSuccess, onError);
    }





    S.play = function (id) {
        S[id].play();
    };
    S.stopBG = function () {
         window.bg_audio.pause();
     }
    S.playBG = function () {
  
        window.bg_audio.play();
     }
    $("#sound_btn").bind("touchend", function () {
        var status = $(this).attr("status");
        if (status == "on") {
            $(this).attr("status", "off")
            .html("打开声音");
            S.stopBG();
        } else {
            $(this).attr("status", "on")
            .html("关闭声音");
            S.playBG();
        }
    });

   
})()