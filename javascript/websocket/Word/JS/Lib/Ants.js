/// <reference path="Common.js" />

(function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var C = window.Common;
    var D = window.Dic;
    var poolMax = 10;
    var A = window.Ant = function () {
        this.dom = null;
        this.id = "Ant_" + Math.random();
        this.css = null;
        this.type = 1;
        this.angle = null;
        this.startPosition = null;
        this.endPosition = null;
        this.startSide = null;
        this.text = null;
    };

    A.prototype.init = function () {
        this.startSide = C.getRandom(0, 3);
        this["init_" + this.startSide]();
        this.initAngle();
        this.initDom();
    };
    A.prototype.setAnswer = function (obj) {

        $(this.dom).attr("word_id", obj.id);
        $(this.text).html(obj.word);
    };
    A.prototype.initDom = function () {
        console.log(0);
        var isAnswerIn = $("#wraper").find("div.[word_id='" + Tip.currentWordId + "']");
        this.dom = document.createElement("div");
        this.text = document.createElement("div");
        $(this.text).css({ "-webkit-transform": "rotate(" + -this.angle + "deg)" });
        $(this.dom).append(this.text);
        if (!isAnswerIn) {
            if (!C.getRandom(0, 3)) {
                console.log(1);
                this.setAnswer(Tip.currentWord);
            }
        } else {
            console.log(2);
            this.setAnswer(D.getOne());
        }
        var flag = false;
        this.dom.addEventListener("webkitTransitionEnd", function () {
            if (!flag) {
                $(this).remove();
            }
            flag = true;

        });
        $(this.dom).attr("id", this.id)
        .addClass("Ant_" + this.type)
        .css({ "-webkit-transform": "rotate(" + this.angle + "deg)", "top": this.startPosition[1] + "px", "left": this.startPosition[0] + "px" })
        .bind("touchend", function () {
            if ($(this).attr("word_id") != Tip.currentWordId + "") {
                var x = window.parseInt($(this).css("left"));
                var y = window.parseInt($(this).css("top"));
                Coin.addCoin(x, y);
                $(this).remove();
                window.Player.lianji++;
            } else {
                window.Player.lianji = 1;
            }
        });
    };
    A.prototype.initAngle = function () {
        var y = this.endPosition[1] - this.startPosition[1];
        var x = this.endPosition[0] - this.startPosition[0];
        this.angle = -(Math.atan2(-y, x) / Math.PI) * 180;
    };
    A.prototype.init_0 = function () {
        this.startPosition = [C.getRandom(0, width), 0];
        this.endPosition = [C.getRandom(0, width), height];
    };


    A.prototype.init_1 = function () {
        this.startPosition = [width, C.getRandom(0, height)];
        this.endPosition = [0, C.getRandom(0, height)];
    };


    A.prototype.init_2 = function () {
        this.startPosition = [C.getRandom(0, width), height];
        this.endPosition = [C.getRandom(0, width), 0];
    };


    A.prototype.init_3 = function () {
        this.startPosition = [0, C.getRandom(0, height)];
        this.endPosition = [width, C.getRandom(0, height)];
    };

    A.prototype.render = function () {
        var _this = this;
        $("#wraper").append(this.dom);
        window.setTimeout(function () { $(_this.dom).css({ "top": _this.endPosition[1] + "px", "left": _this.endPosition[0] + "px" });  }, 0);
    };

    A.prototype.hide = function () {
        $(this.dom).remove();
    }
})()

//webkitTransitionEnd