/// <reference path="../Tool/Tool.js" />

(function () {
    var m = window.Model;
    var t = window.Common;
    var global = window.GLOBAL_CONFIG;
    var RT = window.RunTime;
    var bingo = m.Bingo = function () {
        this.bingoCount = null;
        this.type = null;
        this.bingoArray = [];
    };
    bingo.prototype.init = function (bingoConfig) {
        this.bingoCount = bingoConfig.bingoCount;
        this.type = bingoConfig.type;
        this.bingoArray = bingoConfig.bingoArray;
    }
    bingo.prototype.addIco = function (ico) {
        this.bingoArray.push(ico);

    };
    bingo.prototype.hideIco = function () {
        for (var i in this.bingoArray) {
            var ico = this.bingoArray[i];
            
        }
    }





})()