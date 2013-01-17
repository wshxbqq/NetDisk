/// <reference path="../Tool/Tool.js" />
(function () {
    var m = window.Model;
    var global = window.GLOBAL_CONFIG;
    var t = window.Common;
    var RT = window.RunTime;

    var container = m.Container = function () {
        this.DOM = null;
        this.top = null;
        this.left = null;
        this.rowArray = [];

    };
    container.prototype.init = function () {
        var width = global.icoWidth;
        for (var i = 0; i < 5; i++) {
            var row = new m.Row();
            row.index = i;
            row.init({ top: i * width });
            this.rowArray.push(row);
        };
        this.initDOM();
    };

    container.prototype.initDOM = function () {
        var containerDOM = t.createDom("div", { "class": "container" }, { "": "" });
        for (var i in this.rowArray) {
            var _row = this.rowArray[i];
            _row.parent = this;
            for (var j in _row.icoArray) {
                var _ico = _row.icoArray[j];
                $(containerDOM).append(_ico.DOM);
            }
        };
        this.DOM = containerDOM;
        this.initEvent();
    };

    container.prototype.initEvent = function () {
        var D = this.DOM;
        var _this = this;
        D.addEventListener(global.startEvent, function (e) {
            var ico = $(e.target).data("ico");
            RT.selectedIco = ico;
            ico.shake();

            window.ico = ico;
        });

        D.addEventListener(global.moveEvent, function (e) {
            var left = e.touches[0].pageX;
            var top = e.touches[0].pageY;
            var positionObj = { "top": top, "left": left };
            for (var i in _this.rowArray) {
                var _row = _this.rowArray[i];
                _row.parent = _this;
                for (var j in _row.icoArray) {
                    var _ico = _row.icoArray[j];
                    if (_ico != RT.selectedIco) {
                        if (!_ico) {
                            console.log(_ico);
                        }
                        if (_ico.isPointsIn(positionObj)) {
                            var Position_SelectedIco = { "top": RT.selectedIco.top, "left": RT.selectedIco.left };
                            var Position__ico = { "top": _ico.top, "left": _ico.left };
                            _ico.setPosition(Position_SelectedIco);
                            RT.selectedIco.setPosition(Position__ico);
                            t.swap(RT.selectedIco, _ico);
                        }
                    }
                }
            };


        });

        D.addEventListener(global.endEvent, function (e) {
            RT.selectedIco.stopShake();
            _this.evaluateGrid();
        });
    };


    container.prototype.evaluateGrid = function () {
        var _this = this;
        RT.binggoArray.splice(0, RT.binggoArray.length);
        _this._horizontalCheck();
        _this._verticalCheck();
        t.ansyBingo();
        console.log(RT.binggoArray);
        for (var i in RT.binggoArray) {
            var bingo = RT.binggoArray[i];
            for (var j in bingo.bingoArray) {
                var ico = bingo.bingoArray[j];
                ico.disappear();
            }
        }
        window.setTimeout(function(){_this.full();},500);
        
    };

    container.prototype.full = function() {
        var _this=this;
        for (var i = 0; i < this.rowArray.length; i++) {
           var row= this.rowArray[i];
           row.full();
           row.updatePosition();
        };
    };
    container.prototype._check = function (list) {
        var bingoCount = 1;
        var bingoIcoID = null;
        var binggoIcos = [];

        for (var j in list) {
            var ico = list[j];
            if (bingoIcoID != ico.ID) {
                if (bingoCount >= 3) {
                    var bingo = new m.Bingo();
                    bingo.init({ "bingoCount": bingoCount, "type": bingoIcoID, "bingoArray": binggoIcos });
                    RT.binggoArray.push(bingo);
                }
                bingoCount = 1;
                bingoIcoID = ico.ID;
                binggoIcos = [ico];
            } else {
                bingoCount++;
                binggoIcos.push(ico);
            }

            if (j == (list.length - 1)) {
                if (bingoCount >= 3) {
                    var bingo = new m.Bingo();
                    bingo.init({ "bingoCount": bingoCount, "type": bingoIcoID, "bingoArray": binggoIcos });
                    RT.binggoArray.push(bingo);
                }
            }
        }
    }

    container.prototype._horizontalCheck = function () {
        var _this = this;
        for (var i in _this.rowArray) {
            var _row = _this.rowArray[i];
            _this._check(_row.icoArray);
        }
    };


    container.prototype._verticalCheck = function () {
        var _this = this;
        for (var i = 0; i < 6; i++) {
            var verticalArray = [];
            for (var j in _this.rowArray) {
                var _row = _this.rowArray[j];
                verticalArray.push(_row.icoArray[i]);
            }
            _this._check(verticalArray);
        }
    }
})()