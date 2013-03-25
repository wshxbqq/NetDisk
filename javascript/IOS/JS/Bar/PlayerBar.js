/// <reference path="../Common/Common.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;
    var A = window.Ansy;

    var PB = window.PlayerBar = function () {
        this.ID = null;

        this.DOM = null;
        this.headDOM = null;
        this.HPBar = null;
        this.HPBarInner = null;
        this.name = null;
        this.HP = null;
        this.MaxHP = null;
        this.parent = null;

    };

    
    PB.prototype.init = function (config) {
        this.ID = "ICO_" + Math.random();
        this.config = config;
        this.MaxHP = config.MaxHP;
        this.HP = config.MaxHP;
        this.initDOM();
    };

    PB.prototype.remove = function () {
        $(this.DOM).remove();
    };

    PB.prototype.shakeHead = function () {
        var _this = this;
        window.setTimeout(function () {
            $(_this.headDOM).removeClass("PlayerBarShake");
            window.setTimeout(function () {
                $(_this.headDOM).addClass("PlayerBarShake");
            }, 0);
        },0);
    };

    PB.prototype.minusHP = function (count) {
        var percent = 0;
        if (count < this.HP) {
            this.HP = this.HP - count;
            if (this.HP > this.MaxHP) {
                this.HP = this.MaxHP;
            }
            percent = C.int((this.HP / this.MaxHP) * 100);
        };
        $(this.HPBarInner).css("width", percent + "%");
    };

    PB.prototype.showNum = function (numConfig) {


        var num = new window.Num(numConfig);
        num.init();
        var position = $(this.headDOM).offset();


        var top = C.int(position.top) + 50;
        var left = C.int(position.left) + 100;

        var p = { "top": top + "px", "left": left + "px" };
        $(num.DOM).css(p);
        $(num.DOM).addClass("enemyIcoNum");
        num.show();
    }

    PB.prototype.render = function (parent) {

        this.parent = parent;
        $(parent).append(this.DOM);

    };


    PB.prototype.initDOM = function () {
        var div_PlayerBar = C.createDom("div", { "class": "PlayerBar" }, {});
        var div_PlayerHeadIcoBorder = C.createDom("div", { "class": "PlayerHeadIcoBorder" }, {});
        var div_PlayerHeadIco = C.createDom("div", { "class": "PlayerHeadIco" }, { "background-image": "url('" + this.config.img + "')" });
        var div_HPBarInner = C.createDom("div", { "class": "PlayerHPBarInner" }, {});
        var div_PlayerHPBar = C.createDom("div", { "class": "PlayerHPBar" }, {});
        var div_name = C.createDom("div", { "class": "name" }, {});
        $(div_name).html(this.config.name);
        $(div_PlayerHPBar).append(div_HPBarInner);
        $(div_PlayerHeadIcoBorder).append(div_PlayerHeadIco);
        $(div_PlayerBar).prepend(div_PlayerHeadIcoBorder)
        .prepend(div_PlayerHPBar)
        .prepend(div_name);

        this.DOM = div_PlayerBar;
        this.HPBarInner = div_HPBarInner;
        this.headDOM = div_PlayerHeadIco;
        this.HPBar = div_PlayerHPBar;
        this.name = div_name;

        var playerClicp1 = new MovieClip(div_PlayerHeadIco, this.config);
        playerClicp1.init();
        R.clipArray.push(playerClicp1);
    };

   



})()