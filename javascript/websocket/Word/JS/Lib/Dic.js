/// <reference path="Common.js" />

(function () {

    var D = window.Dic = {};
    D.cect4 = [
        { "id": "1111", "word": "hello", "explain": "你好" },
        { "id": "1112", "word": "adasd", "explain": "你好" },
        { "id": "1113", "word": "zxczxc", "explain": "你好" },
        { "id": "1114", "word": "weqwe", "explain": "你好" }
    ];






    D.current = D.cect4;

    D.getOne = function () {
        return D.current[ window.parseInt(Math.random() * D.current.length)];
    };
    D.getById = function (id) {
        var result;
        for (var i in D.current) {
            var n = D.current[i];
            if (n.id = id) {
                result = n;
            }
        }
        return result;
    }
})();