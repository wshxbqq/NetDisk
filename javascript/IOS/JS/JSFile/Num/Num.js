(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;

    var N = window.Num = function (config) {
        this.config = config;
        this.DOM = null;
    };

    //{"text":"123","color":"red","left":"","top":""}

    N.prototype.init = function () {
        var div = C.createDom("div", { "class": "Num" }, { "color": this.config.color });
        div.innerHTML = this.config.text;
        div.addEventListener("webkitAnimationEnd", function (e) {
            $(div).remove();
        });
        $(div).addClass("Num");
        this.DOM = div;
    };


    N.prototype.show = function () {
        $(wraper).prepend(this.DOM);
    };

})()