(function () {
    var P = window.Panel = function () { };
    P.small_tip = [
 '          <div class="small_tip_bg" style="top:{4}px;left:{3}px">                        ',
 '           <div class="small_inner">                        ',
 '               <br />                                       ',
 '               <p class="inner_word">{0}</p>             ',
 '                                                            ',
 '               <p class="inner_yinbiao">{1}</p>          ',
 '                                                            ',
 '              <p class="inner_expain">{2}</p>           ',
 '                                                            ',
 '           </div>                                           ',
 '                                                            ',
 '       </div>'
    ].join("");

    P.showMarkAdd = function (x,y,mark) {
        var div = document.createElement("div");
        $(div).addClass("mark_add")
        .css({ "left": x + "px", "top": y + "px", "color": mark >= 0 ? "green" : "red" })
        .bind("webkitAnimationEnd", function () {
            $(this).remove();
        })
        .html((mark >= 0 ? "+" : "")+mark);
        $("#wraper").append(div);
    }

    P.showSmall_tip = function (a, b, c,x,y) {
        $(".small_tip_bg").remove();
        var html = P.small_tip.replace(/{.*?}/g, function (match) {
            switch (match) {
                case "{0}": return a; break;
                case "{1}": return b; break;
                case "{2}": return c; break;
                case "{3}": return x; break;
                case "{4}": return y; break;
            }
        });
        $("#wraper").prepend(html);
        var d = window.setTimeout(function () {
            $(".small_tip_bg").fadeOut(500, function () {
                $(".small_tip_bg").remove();
            });
        }, 2000);
        $(".small_tip_bg").bind("touchend", function () {
            $(".small_tip_bg").fadeOut(500, function () {
                $(".small_tip_bg").remove();
            });
        });

    };

    P.showWellcome = function (data) {
        $(".panelContainer").remove();
        var html = P.wellComeHTML.replace(/{.*?}/g, function (match) {
            switch (match) {
                case "{name}": return data.name; break;
                case "{level}": return data.level; break;
                case "{mark}": return data.mark; break;

            }
        });
        $("#wraper").prepend(html)
    }
})()