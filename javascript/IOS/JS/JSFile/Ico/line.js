/// <reference path="../../Common/Common.js" />
(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var I = window.Ico;
    var L = window.Line = function () {
        this.icos = [];
        this.DOM = null;
        this.left = null;
        this.index = null;
        this.parent = null;
    };


    L.prototype.init = function () {
        this.initDOM();
        this.fill();
        this.adjust();
    };

    L.prototype.fill = function () {
        var pool = window.RunTime.IcoPool;
        while (this.icos.length < G.lineLength) {
            var index = C.getRandom(0, pool.length,1);
            var ico = new I();
            ico.parent = this;
            ico.init(pool[index]);
            this.icos.unshift(ico);
            $(this.DOM).prepend(ico.DOM);
        };

        for (var i in this.icos) {
            var _ico = this.icos[i];
            _ico.index = C.int(i);
        }
    };



    L.prototype.adjust = function () {
        var _this = this;
        for (var i in this.icos) {
            var ico = _this.icos[i];
            var index = C.int(i);
            ico.setPosition(index * G.icoWidth);
        };
    };

    L.prototype.initDOM = function () {
        this.DOM = C.createDom("div", { "class": "line" }, {});
    };


    L.prototype.getIndexByIco = function (ico) {
        var index = null;
        for (var i in this.icos) {
            if (this.icos[i] === ico) {
                index = C.int(i);
            }
        }
        return index;
    };


})()