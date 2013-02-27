

(function () {


    var C = window.Common = {};
    C.getRandom = function (a, b) {
        var result = window.parseInt(a + (1 + b - a) * Math.random());
        return result;
    };

    $("#back_btn").bind("touchend", function () {
        window.location.reload();
    });

    $(".panelInner").find("a.btn_yellow").bind("click", function () {
        $(".mask").remove();
        $(".panelContainer").remove();
        window.Dic.current = window.Dic[$(this).attr("d_id")];
        window.Tip.changWord();
        window.begin = 1;
    });

    $("#wraper").css("background-image", "url(R/Img/Common/bg_" + C.getRandom(1, 15) + ".jpg)");

    
})()