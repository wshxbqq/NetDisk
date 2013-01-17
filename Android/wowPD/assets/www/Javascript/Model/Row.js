(function () {
    var m = window.Model;
    var global = window.GLOBAL_CONFIG;


    var row = m.Row = function () {
        this.top = null;
        this.index = null;
        this.icoArray = [];
    };
    row.prototype.init = function (rowConfig) {
        var width = global.icoWidth;
        this.setTop(rowConfig.top);
        for (var i = 0; i < 6; i++) {
            var ico = m.ICO.getOneIco();
            ico.index = i;
            ico.setPosition({ top: this.top, left: width * i });
            ico.parent = this;
            this.icoArray.push(ico);
        }
    };
    row.prototype.setTop = function (top) {
        this.top = top;
    };
    row.prototype.full = function() {
        var _this=this;
        var newRowArray=[];
        for (var i = this.icoArray.length - 1; i >= 0; i--) {
            var ico=this.icoArray[i];
            if (!ico.released) {
                newRowArray.unshift(ico);
            };
        };
        var leaseIcoCount=6-newRowArray.length;
        var width = global.icoWidth;
        for (var i = 0; i < leaseIcoCount; i++) {
            var ico = m.ICO.getOneIco();
            ico.index = i;
            ico.setPosition({ top: this.top, left: width * (-1) });
            ico.parent = this;
            $(this.parent.DOM).append(ico.DOM);
            newRowArray.unshift(ico);
        };

        this.icoArray=newRowArray;
    };


    row.prototype.updatePosition = function() {
        var width = global.icoWidth;
        for (var i = 0; i < this.icoArray.length; i++) {
            var ico=this.icoArray[i];
            var positionObj={top:ico.top,left:i*width};
            ico.setPosition(positionObj);
        };
    };

})()