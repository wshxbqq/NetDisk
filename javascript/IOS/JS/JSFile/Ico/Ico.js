/// <reference path="../Common/Common.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;


    var ico = window.Ico = function () {
        this.ID = null;

        this.DOM = null;

        this.top = null;

        this.parent = null;

        this.config = null;

        this.index = null;

        this.isDie = false;

        this.dieCB = null;
    };

    
    ico.prototype.init = function (icoConfig) {
        this.ID = "ICO_" + Math.random();
        this.config = icoConfig;
        this.initDOM();
    };

    ico.prototype.initDOM = function () {
        var div = C.createDom("div", { "class": "ico" }, { "background-image": "url('" + this.config.img + "')" });
        div.ico = this;
        this.DOM = div;
        div.addEventListener("webkitAnimationEnd", this.remove);
        div.addEventListener("click", function () {
            if (R.isA) {
                return;
            }
            R.isA = true;
            M.explode(this.ico);
        });
        this.setPosition(-200);
    };


    ico.prototype.setPosition = function (top,direct) {
        var _this = this;
        this.top = top;
        window.setTimeout(function () { $(_this.DOM).css({ "top": _this.top + "px" }); }, 0);
        
    };

    ico.prototype.shake = function () {
        var _this = this;
        $(_this.DOM).addClass("shake");
    };

    ico.prototype.explode = function () {
        this.shake();
    };

    ico.prototype.getIndex = function () {
        return this.parent.getIndexByIco(this);
    };

    ico.prototype.remove = function (e) {
        _this = e.target.ico;
        var position = $(_this.DOM).offset();
        console.log(position);
        var x = C.int(position.left);
        var y = C.int(position.top);
        M.showFirWork(x+40, y+40);
        _this.isDie = true;
        var line = _this.parent;
        C.remove(_this, line.icos);
        $(_this.DOM).remove();

        if (_this.dieCB) {
            _this.dieCB();
        };

    }


})()