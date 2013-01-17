/// <reference path="../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../Libs/Jquery/jquery.js" />
(function () {

    $.mobile.defaultPageTransition = 'slidefade';
    if (navigator.userAgent.indexOf("Android") != -1) {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    }

    var c = window.Common = {};
    c.defaultEventName = "tap";
    c.getTimeFormat = function (format) {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var dateStr;
        if (format) {
            dateStr = year + "年" + month + "月" + date + "日";
        } else {
            dateStr = year + "_" + month + "_" + date + "_" + hours + "_" + minute + "_" + second;
        };

        return dateStr;
    }
    
    c.reflashDelBtn = function () {
        $(".delBtnRightTop").find("a").button();
    };

    c.getIndexAt=function(array,fun){
      var result;
      for (var i = 0; i < array.length; i++) {
            var obj=array[i];
            if(fun(obj)){
                result=i;
                break;
            }
            
        }
        return result;
    }

    c.toTime = function (str) {
        var sArray = str.match(/\d+/g);
        var s = sArray[0] + "年" + sArray[1] + "月" + sArray[2] + "日";
        return s;
    }

    c.to = function (url) {
        $.mobile.changePage(url);
    };

    c.toLocal = function (cb) {
        var json = JSON.stringify(LIVE_DATA);
        c.phoneGapCommon.DATA.set(json, function (entity) {

        });
    }

    c.objExt = {};
    c.objExt.getFirst = function (obj) {
        var result = {};
        for (var i in obj) {
            result.key = i;
            result.value = obj[i];
            break;
        };
        return result;
    }

    c.phoneGapCommon = {};

    c.phoneGapCommon.Img = {};

    c.phoneGapCommon.Img.getPuicure = function (imgName, CB) {
        navigator.device.capture.captureImage(function (mediaFiles) {
            var imgObj = mediaFiles[0];
            var name = imgObj.name;
            var fullPath = imgObj.fullPath;

            window.PhoneGapDocRoot.getDirectory("imgs", { create: true }, function (imgDirectory) {

                var fileEntry = new FileEntry();
                fileEntry.fullPath = fullPath;
                fileEntry.name = name;

                fileEntry.copyTo(imgDirectory, imgName + "."+fileEntry.name.split('.')[1], function (entry) {
                    CB(entry);
                }, null);


            }, null);

        }, function () {

        }, { limit: 1 });
    };

    c.phoneGapCommon.Audio = {};

    c.phoneGapCommon.Audio.getAudio = function (audioName, CB) {
        navigator.device.capture.captureAudio(function (mediaFiles) {
            var imgObj = mediaFiles[0];
            var name = imgObj.name;
            var fullPath = imgObj.fullPath;
            window.PhoneGapDocRoot.getDirectory("audios", { create: true }, function (audioDirectory) {

                var fileEntry = new FileEntry();
                fileEntry.fullPath = fullPath;
                fileEntry.name = name;
                fileEntry.copyTo(audioDirectory, audioName + "." + fileEntry.name.split('.')[1], function (entry) {
                    CB(entry);
                }, null);
            }, null);
        }, function () { }, { limit: 1 });
    };

    c.phoneGapCommon.Video = {};

    c.phoneGapCommon.Video.getVideo = function (videoName, CB) {
        navigator.device.capture.captureVideo(function (mediaFiles) {
            var imgObj = mediaFiles[0];
            var name = imgObj.name;
            var fullPath = imgObj.fullPath;

            window.PhoneGapDocRoot.getDirectory("videos", { create: true }, function (videoDirectory) {
                var fileEntry = new FileEntry();
                fileEntry.fullPath = fullPath;
                fileEntry.name = name;
                fileEntry.copyTo(videoDirectory, videoName + "." + fileEntry.name.split('.')[1], function (entry) {
                    CB(entry);
                }, null);
            }, null);
        }, function () { }, { limit: 1 });
    }

    c.phoneGapCommon.DATA = {};

    c.phoneGapCommon.DATA.get = function (CB) {
        window.FM.readFile("DATA", CB);

    };
    c.phoneGapCommon.DATA.set = function (text, CB) {
        var F = window.FM;
        F.exist("DATA", function (ext) {
            if (ext) {
                window.FM.writeFile("DATA", text, CB);
            } else {

                F.createFile("DATA", function () {
                    window.FM.writeFile("DATA", text, CB);
                });
            }
        });
    }
})()