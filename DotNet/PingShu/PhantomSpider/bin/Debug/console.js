(function () {
    console.log(phantom);
    var system = require('system');
    var fs = require('fs');
    var pageUrl = system.args[1];
    var path = system.args[2];
    var page = require('webpage').create();
    var page2 = require('webpage').create();
    //伪装成 chrome
    //page.settings.javascriptEnabled = false;
    page.settings.loadImages = false;
    //    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1';
    var result = "";

    var evaluateFunction = function (jquery) {
        window.eval(jquery);
        var url1 = $("iframe[name=playmedia]").attr("src");
        location.href = url1;
        return url1;
    }

    var evaluateFunction1 = function (mp3Name) {
        var r = /xiangsheng.*?mp3/;
        var result = czplayer.URL;
        result = result.replace(r, function (match) {
            return "xiangsheng/" + mp3Name;
        });

        return result;
    }

    page.open(pageUrl, function (status) {


    });
    var queryString = function (url) {
        var reg = /filename=.*?mp3/;

        return url.match(reg)[0].split("=")[1];
    }

    var timeOut = window.setTimeout(function () {
        var _url = page.evaluate(evaluateFunction, fs.read("E:/NetDisk/PingShu/Spider/bin/Debug/jquery.js"));
        page2.open("http://www.tingchina.com/" + _url);
        window.setTimeout(function () {
            var url = page2.evaluate(evaluateFunction1, queryString(_url));
            console.log("#result#" + encodeURI(url) + "#result#");
            phantom.exit();
        }, 10000);
    }, 10000);



    window.setTimeout(function () {
        phantom.exit();
    },60000);

})()
