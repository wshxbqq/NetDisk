/// <reference path="Common.js" />
/// <reference path="Dic.js" />

(function () {

    var C = window.Common;
    var D = window.Dic;


    var p = window.Player = {};
    p.mark = 1000;
    p.lianji = 1;
    p.addMark = function (mark) {
        p.mark += mark;
        $(".level").html(p.mark);
    };
    p.addLianji = function () {
        if (p.lianji >= 5) {
            return;
        } else {
            p.lianji++;
            var ico = $(".expIco").eq(p.lianji - 1)
            .removeClass("showScale")
            .removeClass("transparent");
             window.setTimeout(function () { ico.addClass("showScale"); }, 0);
        }

    };
    p.wrong = function () {
        $(".expIco")
        .removeClass("showScale")
        .removeClass("transparent")
        .addClass("transparent")
        .eq(0).removeClass("transparent");

    }
    p.addMark(0);
})();