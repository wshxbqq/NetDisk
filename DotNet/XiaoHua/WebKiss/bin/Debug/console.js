(function () {
    console.log(phantom);
    var system = require('system');
    var fs = require('fs');
    var ID = system.args[1];
    var URL = system.args[2];
    var page = require('webpage').create();
    //伪装成 chrome
    //page.settings.javascriptEnabled = false;
    page.settings.loadImages = false;
    //    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1';
    var result = "";

    var evaluateFunction = function (jquery) {
        window.eval(jquery);
        $("img").remove();
        $("embed").remove();
        $("script").remove();

        var title = $("title").html().split("_")[0];
        var html = $("#text110").html();

        var result = title + "▲" + html;

        return result;
    }



    page.open(URL, function (status) { });


    var timeOut = window.setTimeout(function () {
        var r = page.evaluate(evaluateFunction, fs.read("E:/NetDisk/PingShu/Spider/bin/Debug/jquery.js"));
        r = "#result#" + ID + "◆" + r + "#result#";
        console.log(r);
    }, 10000);



    window.setTimeout(function () {
        phantom.exit();
    }, 15000);

})()
