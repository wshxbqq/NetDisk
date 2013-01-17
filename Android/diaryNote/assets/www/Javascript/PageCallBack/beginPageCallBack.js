/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    var setDate = function () {
        var dateStr = c.getTimeFormat(true);
        $("#beginPage_head").html(dateStr);

    };
    var bindBtn = function () {
        //调用摄像头
        $("#beginPage_createBtn").bind(c.defaultEventName, function () {
            c.to("story.html");
        });
    }

    $("#beginPage").live("pageshow", function () {
        setDate();
        bindBtn();

    });

})()