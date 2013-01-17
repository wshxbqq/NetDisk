/// <reference path="../Lib/Jquery/jquery.js" />
/// <reference path="../Lib/JqueryMobile/jquery.mobile-1.2.0.css" />
/// <reference path="../Lib/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="audioPlayer.js" />

/// <reference path="tool.js" />

var PingShu = window.PingShu = {};
var DefaultEventName = "touchend";

PingShu.getParam=function(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

PingShu.to = function (url) {   
    $.mobile.changePage(url);
};



$("button.backBtn").live(DefaultEventName, function () {
    var preUrl = $.mobile.urlHistory.getPrev().pageUrl;
    if (preUrl.indexOf("index.html") == -1) {
        $.mobile.back();
        if (window.songPlayer) {
            window.songPlayer.dispose();
            window.clearInterval(window.UIinterval);
        }
    }
});


 $("a[dataFor='addFavourite']").live(DefaultEventName, function () {
     var $li = $(this).parent();
     var bookID = $(this).attr("bookID");
     if (!tool.checkBookIdInFavourite(bookID)) {
         tool.addFavourite(bookID);
         tool.setLiFavoutiteRender($li);
     } else {
         tool.removeFavourite(bookID);
         tool.unSetLiFavoutiteRender($li);
     }
 });



 $("a[dataFor='DelFavourite']").live(DefaultEventName, function () {
     var $li = $(this).parent();
     var bookID = $(this).attr("bookID");
     if (tool.checkBookIdInFavourite(bookID)) {
         tool.removeFavourite(bookID);
         $li.remove();
     }
 });



 $(document).ready(function () {
     $.mobile.defaultPageTransition = 'slide';
     if (navigator.userAgent.indexOf("Android") != -1) {
         $.mobile.defaultPageTransition = 'none';
         $.mobile.defaultDialogTransition = 'none';
     }
     window.setTimeout(function () {
         PingShu.to("/Logic/Hot.aspx");
     },2000);
    

 });




