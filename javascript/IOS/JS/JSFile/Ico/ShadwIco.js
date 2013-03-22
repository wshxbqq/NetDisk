/// <reference path="../../Common/Common.js" />


(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var S = window.ShadowIco = function () {
        this.ID = null;

        this.DOM = null;

        this.top = null;

        this.parent = null;

        this.config = null;

        this.dieCB = null;
    };

    
    S.prototype.init = function (icoConfig,position) {
        this.ID = "SHADOW_ICO_" + Math.random();
        this.config = icoConfig;
        this.initDOM(position);
    };

    S.prototype.initDOM = function (position) {
        var _this = this;
        var div = C.createDom("div", { "class": "shadowIco" }, { "background-image": "url('" + this.config.img + "')" });
        div.shadwIco = this;
        div.addEventListener("webkitTransitionEnd", function (e) {
            if (_this.dieCB) {
                _this.dieCB(e);
            };
            _this.remove();
        });
        $(div).css(position);
        this.DOM = div;
    };

    S.prototype.render = function (parent) {
        this.parent = parent;
        $(this.parent).prepend(this.DOM);
    };

    S.prototype.setPosition = function (top, left) {
        var _this = this;
        window.setTimeout(function () {
            $(_this.DOM).css({ "-webkit-transform": "translateX("+left+"px) translateY("+top+"px)" });
        }, 0);
    };
    S.prototype.remove = function () {
        $(this.DOM).remove();
    };

})()