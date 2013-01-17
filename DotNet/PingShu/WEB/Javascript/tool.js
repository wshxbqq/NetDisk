/// <reference path="../Lib/Jquery/jquery.js" />
/// <reference path="../Lib/JqueryMobile/jquery.mobile-1.2.0.css" />
/// <reference path="../Lib/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="audioPlayer.js" />
var tool = window.tool = {};

var GLOBAL_CONFIG = {}
GLOBAL_CONFIG.DC_SERVER = "http://192.168.1.104:8080/";
GLOBAL_CONFIG.XIAOHUA_SERVER = "http://192.168.1.104:8787/";


tool.getFavourite = function () {
    var fav = localStorage["favourite"] || "";
    if(!fav.match(/\d/)){
        fav=""
    }
    return fav;
};

tool.setFavourite = function (favString) {
    localStorage["favourite"] = favString;
};
tool.addFavourite = function (bookId) {
    var fav = localStorage["favourite"];
    if (!fav) {
        fav = bookId;
    } else {
        if (fav.indexOf(bookId) == -1) {
            fav += "," + bookId;
        }
    }
    localStorage["favourite"] = fav;
    tool.AddFavouriteFromServer(bookId);
};

tool.removeFavourite = function (bookId) {
    var fav = localStorage["favourite"];
    if (!fav) {
        return;
    } else {
        if (fav.indexOf(bookId) > -1) {
            fav = fav.replace(("," + bookId), "");
            fav = fav.replace(bookId, "");
        }
        localStorage["favourite"] = fav;
        tool.removeFavouriteFromServer(bookId);
    }
}

tool.removeFavouriteFromServer = function (bookId) {
    $.post("/Logic/User/userInfo.aspx?action=DelFavourite&stmp=" + Math.random(), { "bookID": bookId });
}

tool.AddFavouriteFromServer = function (bookId) {
    $.post("/Logic/User/userInfo.aspx?action=AddFavourite&stmp=" + Math.random(), { "bookID": bookId });
}

tool.checkBookIdInFavourite = function (id) {
    var fav = tool.getFavourite();
    var favArray = fav.split(',');
    var isFlag = false;
    for (var i in favArray) {
        if (favArray.hasOwnProperty(i)) {
            if (favArray[i] == id) {
                isFlag= true;
            }
        }
    }
    return isFlag;
}

tool.setLiFavoutiteRender = function ($li) {
    var favSpan = document.createElement("span");
    $(favSpan).html("已收藏").addClass("favouriteSpan")
    $li.addClass("favouriteBg");
    $li.children("a[bookid]").addClass("favouriteBg");
    $li.find("h3")
     .css("color", "green")
     .append(favSpan);
}

tool.unSetLiFavoutiteRender = function ($li) {
    $li.removeClass("favouriteBg");
    $li.children("a[bookid]").removeClass("favouriteBg");
    $li.find("h3")
    .css("color", "")
    $li.find(".favouriteSpan").remove();
}

//-----------------------------------------------------------
tool.getUD = function () {
    if (window.localStorage["UD"] != null) {
        window.eval("window.UD=" + window.localStorage["UD"]);
    } else {
        window.UD = {
            userID: "",
            listened: ["254737"],
            favourite: []
        }
    }

    return window.UD;
}

tool.setUD = function () {
    var str = JSON.stringify(window.UD);
    window.localStorage["UD"] = str;
}
//------------------


tool.setFooterActive = function (key) {
    var a = $("#footer_container li a");
    a.each(function (n, i) {
        var $i = $(i);

        if ($i.attr("toLink") === key) {
            $i.addClass("ui-btn-up-b");
        }
    });

};
tool.DC = function (storyId) {
    var DC_script = document.createElement("script");
    DC_script.src = GLOBAL_CONFIG.DC_SERVER+"logger.ashx?appid=pingshu&type=dau&UUID=" + storyId + "&_tamp" + Math.random();
    document.body.appendChild(DC_script);

};

tool.DCXiaoHua = function (storyId) {
    var DC_script = document.createElement("script");
    DC_script.src = GLOBAL_CONFIG.DC_SERVER+"logger.ashx?appid=xiaohua&type=dau&UUID=" + storyId + "&_tamp" + Math.random();
    document.body.appendChild(DC_script);
}

tool.renderXiaoHua = function (Obj) {
    $(".delScript").remove();
    var title = Obj.title;
    var text = Obj.text;
    var $title = $("#xiaohua_title");
    var $text = $("#xiaohua_text");
    var $container = $("#XiaoHuaContainer");
    $container.fadeOut(500, function () {
        $title.html(title);
        $text.html(text);
        $container.find("a").removeAttr("href");
        $container.fadeIn(500);
    });
}

tool.showXiaoHua = function () {
    var XiaoHuaServerPageUrl = GLOBAL_CONFIG.XIAOHUA_SERVER+"XiaoHuaGetter.ashx?type=getOne&function_name=window.tool.renderXiaoHua&temp=" + Math.random();
    var script = "<script class=\"delScript+\"  src=\"" + XiaoHuaServerPageUrl + "\"></script>";
    $("body").append(script);
    window.tool.DCXiaoHua(0);
}