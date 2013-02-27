/// <reference path="Common.js" />
(function () {
    var S = window.Sound = {};
    S.play = function (id) {

    };
    S.stopBG = function () { }
    S.playBG = function () { }
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