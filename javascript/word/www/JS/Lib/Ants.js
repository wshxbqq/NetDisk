/// <reference path="Common.js" />

(function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var C = window.Common;
    var D = window.Dic;
    var P = window.Panel;
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

        $(this.dom).attr("word_id_ant", obj.id)
        $(this.text).html(obj.word);
    };
    A.prototype.initDom = function () {
        this.type = C.getRandom(1,5);
        var config = window.antConfig["Ant_" + this.type];
        var isAnswerIn = $("#wraper").find("div.[word_id_ant='" + Tip.currentWordId + "']").size();
        this.dom = document.createElement("div");
        this.text = document.createElement("div");
        $(this.dom).attr("a_frames", config.frames)
        .attr("s_height", config.height)
        .attr("frames", "1");
        $(this.text).css({ "-webkit-transform": "rotate(" + -this.angle + "deg)" });
        $(this.dom).append(this.text);
        if (!isAnswerIn) {
            var ran = C.getRandom(0, 2);
            if (!ran) {
                
                this.setAnswer(Tip.currentWord);
            } else {
                this.setAnswer(D.getOne());
            }
        } else {
           
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
            var x = window.parseInt($(this).css("left"));
            var y = window.parseInt($(this).css("top"));
            if ($(this).attr("word_id_ant") == Tip.currentWordId + "") {
                Coin.addCoin(x, y);
                $(this).remove();
                window.Player.addLianji();
                Tip.changWord();
                P.showMarkAdd(x, y, window.Player.lianji);
                window.Sound.play("right");
            } else {
                $(this).remove();
                var w;
                for (var i in Dic.current) {
                    if (Dic.current[i].id==$(this).attr("word_id_ant")) {
                        w = Dic.current[i];
                    }
                }
                P.showSmall_tip(w.word, w.soundmark, w.explain,x,y);
                window.Player.lianji = 1;
                window.Player.wrong();
                P.showMarkAdd(x, y, -5);
                window.Player.addMark(-5);
                window.Sound.play("wrong");
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