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
    //{"left":"","top":"",text:[{"text":"123","color":"red",size:"20px"},isCritial:0]}

    N.prototype.init = function () {
        var div = C.createDom("div", { "class": "Num" }, { "color": this.config.color });
        for (var i in this.config.text) {
            var spanConfig = this.config.text[i];
            var span = C.createDom("span", {}, { "color": spanConfig.color, "font-size": spanConfig.size });
            span.innerHTML = spanConfig.text;
            $(div).append(span);
        }
        div.addEventListener("webkitAnimationEnd", function (e) {
            $(div).remove();
        });
        $(div).addClass("Num");
        this.DOM = div;
    };


    N.prototype.show = function () {
        $(wraper).prepend(this.DOM);
    };


    N.getDamageNumConfigObj = function (damage) {
        var text, color;
        if (damage>0) {
            text = -damage;
            color="red";
        } else {
            if (damage == 0) {
                text = "";
            } else {
                text = "+"+Math.abs(damage);
                color = "#b6ff00";
            }
            
        }
        var numConfig = { text: text, color: color, size: "40px" };
        return numConfig;
    };

    N.getStatusNumConfigObj = function (status) {
        var numConfig = { text: "  " + status, color: "#ff6e6e", size: "30px" };
        return numConfig;

    };

    N.getNameNumConfigObj = function (status) {
        var numConfig = { text: "  " + status, color: "#f9ff52", size: "30px" };
        return numConfig;

    };
})()