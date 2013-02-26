/// <reference path="Common.js" />
/// <reference path="Dic.js" />

(function () {

    var C = window.Common;
    var D = window.Dic;



    var coin = window.Coin = {};
    coin.addCoin = function (x, y) {
        for (var i = 0; i < window.Player.lianji; i++) {
            var out = window.setTimeout(function () {
                    var c = document.createElement("div");
                    var flag = false;
                    c.addEventListener("webkitTransitionEnd", function () {
                        if (!flag) {
                            window.Player.addMark(1);
                            $(this).remove();
                        }
                        flag = true;
                    });
                    $(c).addClass("Coin")
                    .css({ "top": (y + C.getRandom(0, 50)) + "px", "left": (x + C.getRandom(0, 50)) + "px" });
                    $("#wraper").append(c);
                    window.setTimeout(function () {
                        $(c).css({ "top": (window.innerHeight - 50) + "px", "left": "100px" });
                    }, 0);
            }, 100*i);
        }
    };
})();