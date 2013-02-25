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
})();