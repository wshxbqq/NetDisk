

(function () {


    var C = window.Common = {};
    C.getRandom = function (a, b) {
        var result = window.parseInt(a + (1 + b - a) * Math.random());
        return result;
    };


})()