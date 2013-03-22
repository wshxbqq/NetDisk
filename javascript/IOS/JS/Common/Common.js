(function () {
    var C = window.Common = {};
    C.getRandom = function (x, y, isInt) {
        var temp = Math.random() * (y - x) + x;

        if (isInt) {
            return parseInt(temp);
        }
        else {
            return temp;
        }
    };
    C.createDom = function (trg, prop, css) {
        var dom = document.createElement(trg);
        if (prop) {
            $(dom).attr(prop);
        };
        if (css) {
            $(dom).css(css);
        };
        return dom;
    };

    C.int = function (i) {
        return window.parseInt(i);
    };


    C.contains = function (obj, list) {
        var result = false;
        for (var i in list) {
            if (list[i] == obj) {
                result = true;
            }
        };
        return result;
    };


    C.getIndex = function (obj, array) {
        var index = null;
        for (var i in array) {
            if (array[i] === obj) {
                index = C.int(i);
            }
        };
        return index;
    };


    C.remove = function (obj,array) {
        for(var i in array){
            var index = C.int(i);
            if (array[i]===obj) {
                array.splice(index, 1);
            }
        }
    };


})()