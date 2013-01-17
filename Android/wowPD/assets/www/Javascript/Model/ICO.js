/// <reference path="../Tool/Tool.js" />

(function () {
    var m = window.Model;
    var t = window.Common;
    var global = window.GLOBAL_CONFIG;
    var RT = window.RunTime;
    var ico = m.ICO = function () {
        this.DOM = null;
        this.top = null;
        this.left = null;
        this.ID = null;
        this.img = null;
        this.sound = null;
        this.index = null;
    };


    ico.prototype.init = function (icoConfig) {
        this.ID = icoConfig.id;
        this.img = icoConfig.img;
        this.sound = icoConfig.sound;
        this.initDOM();


    };
    ico.prototype.initDOM = function () {
        var D = this.DOM;
        var div = t.createDom("div", { "class": "ico" }, { "background-image": "url('" + global.imgPath + "/" + this.img + "')" });
        this.DOM = div;
        $(this.DOM).data("ico", this);
    };
    ico.prototype.setPosition = function (obj) {
        this.top = obj.top;
        this.left = obj.left;
        $(this.DOM).css({ "top": this.top + "px", "left": this.left + "px" });


    };

    ico.prototype.shake = function () {
        var _this = this;
        window.setTimeout(function () {
            $(_this.DOM)
            .removeClass("shaking_fix")
            .addClass("shaking");
        }, 0);
    };
    ico.prototype.stopShake = function () {
        var _this = this;
        window.setTimeout(function () {
            $(_this.DOM)
            .removeClass("shaking")
            .addClass("shaking_fix");
        }, 1)
    };
    ico.prototype.disappear = function (fun) {
        $(this.DOM).hide(500, fun);
        this.released=true;
    };

    ico.prototype.isPointsIn = function (position) {
        var result = false;
        var globalPosition = this.toGlobal();
        if (globalPosition.left < position.left &&
            position.left < globalPosition.left + global.icoWidth &&
            globalPosition.top < position.top &&
            position.top < globalPosition.top + global.icoWidth
            ) {
            result = true;
        }

        return result;
    }

    ico.prototype.toGlobal = function () {
        var position = { top: this.top + RT.containerTop, left: this.left + RT.containerLeft };
        return position;
    };

    ico.prototype.toLocal = function (obj) {
        var position = { top: obj.top - RT.containerTop, left: obj.left - RT.containerLeft };
        return position;
    };



    /*
    static   method 

    
    */

    ico.getOneIco = function () {
        var RT = window.RunTime;
        var icoConfig = t.getOneFromArray(RT.icoPoll);
        var _ico = new ico();
        _ico.init(icoConfig);
        return _ico;
    };

})()