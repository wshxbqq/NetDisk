/// <reference path="../../Common/Common.js" />


(function () {
    var L = window.Line;
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;

    var P = window.IcoPool = function () {
        this.lines = [];
        this.DOM = null;
        this.parent = null;
    };

    P.prototype.init = function () {
        this.initDOM();
        this.initLines();
     
    };

    P.prototype.initDOM = function () {
        this.DOM = C.createDom("div", { "class": "IcoPool" }, {});
    };

    P.prototype.render = function (dom) {
        $(dom).append(this.DOM);
    };

    P.prototype.initLines = function () {
        for (var i = 0; i < G.lineCount; i++) {
            var l = new L();
            l.index = i;
            l.parent = this;
            l.init();
            this.lines.push(l);
            $(this.DOM).append(l.DOM);
        };
    };

    P.prototype.fillExplode = function (ico) {

        var neighbousArray = [];
        var line = ico.parent;
        var icoIndex=ico.index;
        var lineIndex=line.index;
        
        if (line.icos[icoIndex + 1]) {
            var ico1 = line.icos[icoIndex + 1];
            if (ico1.config.id === ico.config.id) {
                if (!C.contains(ico1, R.explodeArray)) {
                    neighbousArray.push(ico1);
                    R.explodeArray.push(ico1);
                }
            }
        };
        if (line.icos[icoIndex - 1]) {
            var ico2 = line.icos[icoIndex - 1];
            if (ico2.config.id === ico.config.id) {
                if (!C.contains(ico2, R.explodeArray)) {
                    neighbousArray.push(ico2);
                    R.explodeArray.push(ico2);
                }
            }
        };

        if (this.lines[lineIndex + 1]) {
            var ico3 = this.lines[lineIndex + 1].icos[icoIndex];
            if (ico3.config.id === ico.config.id) {
                if (!C.contains(ico3, R.explodeArray)) {
                    neighbousArray.push(ico3);
                    R.explodeArray.push(ico3);
                }
            }
        };
        if (this.lines[lineIndex - 1]) {
            var ico4 = this.lines[lineIndex - 1].icos[icoIndex];
            if (ico4.config.id === ico.config.id) {
                if (!C.contains(ico4, R.explodeArray)) {
                    neighbousArray.push(ico4);
                    R.explodeArray.push(ico4);
                }
            }
        };

        for (var i in neighbousArray) {
            var _ico = neighbousArray[i];
            this.fillExplode(_ico);
        }

    }

    P.prototype.fill = function () {
        for (var i in this.lines) {
            var l = this.lines[i];
            l.fill();
            l.adjust();
        };
    };

    P.prototype.explode = function (ico) {
        var _this = this;
        R.explodeArray = [ico];
        this.fillExplode(ico);
        var count = 0;
        for (var i in R.explodeArray) {
            var _ico = R.explodeArray[i];
            _ico.dieCB = function () {
                count++;
                if (count >= R.explodeArray.length) {
                    console.log(_this);
                    _this.fill();
                }
            };
            _ico.shake();
        }
    }


})()