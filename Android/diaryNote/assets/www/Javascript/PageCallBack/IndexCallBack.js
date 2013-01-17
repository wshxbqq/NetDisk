/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    $.support.cors = true;
    $.mobile.defaultPageTransition = 'slidefade';
    $.mobile.allowCrossDomainPages = true;
    $.mobile.buttonMarkup.hoverDelay = 0;
    $.mobile.phonegapNavigationEnabled = true;

    $("#indexPage").live("pageshow", function () {
//        c.to("Pages/dayList.html");
//        window.LIVE_DATA = new window.Model.DATA();
//        var d = { "type": "DATA", "UUID": "XXXXXXX", "CreateTime": "", "Diary": { "Day_2012_12_21": { "type": "day", "Day_ID": "Day_2012_12_21", "Story": { "Story_2012_12_21_20_39_20": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_15_9.jpg", "createTime": "2012_12_22_18_15_9", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_15_9.jpg", "imgId": "img_2012_12_22_18_15_9" }, { "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_23_10_49_55.jpg", "createTime": "2012_12_23_10_49_55", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_23_10_49_55.jpg", "imgId": "img_2012_12_23_10_49_55"}], "Video": [{ "type": "video", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_21_20_42_56.MOV", "createTime": "2012_12_21_20_42_56", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_21_20_42_56.MOV", "videoId": "video_2012_12_21_20_42_56"}], "Sound": [], "Text": "乒乓拍", "StoryId": "Story_2012_12_21_20_39_20" }, "Story_2012_12_21_20_43_33": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_14_20_52.jpg", "createTime": "2012_12_24_14_20_52", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_14_20_52.jpg", "imgId": "img_2012_12_24_14_20_52"}], "Video": [{ "type": "video", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_24_3_32_6.MOV", "createTime": "2012_12_24_3_32_6", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_24_3_32_6.MOV", "videoId": "video_2012_12_24_3_32_6" }, { "type": "video", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_24_12_0_56.MOV", "createTime": "2012_12_24_12_0_56", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_24_12_0_56.MOV", "videoId": "video_2012_12_24_12_0_56"}], "Sound": [], "Text": "地猝死起度系ffccc就会好很好zzzz", "StoryId": "Story_2012_12_21_20_43_33" }, "Story_2012_12_22_14_45_3": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_3_31_18.jpg", "createTime": "2012_12_24_3_31_18", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_3_31_18.jpg", "imgId": "img_2012_12_24_3_31_18"}], "Video": [], "Sound": [], "Text": "点击这里填写日记f g g", "StoryId": "Story_2012_12_22_14_45_3"}} }, "Day_2012_12_22": { "type": "day", "Day_ID": "Day_2012_12_22", "Story": { "Story_2012_12_22_18_8_44": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_14.jpg", "createTime": "2012_12_22_18_12_14", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_14.jpg", "imgId": "img_2012_12_22_18_12_14" }, { "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_22.jpg", "createTime": "2012_12_22_18_12_22", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_22.jpg", "imgId": "img_2012_12_22_18_12_22" }, { "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_40.jpg", "createTime": "2012_12_22_18_12_40", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_18_12_40.jpg", "imgId": "img_2012_12_22_18_12_40"}], "Video": [{ "type": "video", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_22_18_13_1.MOV", "createTime": "2012_12_22_18_13_1", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/videos/video_2012_12_22_18_13_1.MOV", "videoId": "video_2012_12_22_18_13_1"}], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_8_44" }, "Story_2012_12_22_18_13_49": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_13_49" }, "Story_2012_12_22_18_14_0": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_14_0" }, "Story_2012_12_22_18_14_13": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记c c c c", "StoryId": "Story_2012_12_22_18_14_13" }, "Story_2012_12_22_18_14_30": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_14_30" }, "Story_2012_12_22_18_14_35": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_14_35" }, "Story_2012_12_22_18_15_48": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_23_5_47.jpg", "createTime": "2012_12_22_23_5_47", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_22_23_5_47.jpg", "imgId": "img_2012_12_22_23_5_47"}], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_22_18_15_48"}} }, "Day_2012_12_24": { "type": "day", "Day_ID": "Day_2012_12_24", "Story": { "Story_2012_12_24_14_23_47": { "type": "story", "Img": [{ "type": "img", "urlPath": "file://localhost/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_14_24_48.jpg", "createTime": "2012_12_24_14_24_48", "filePath": "/var/mobile/Applications/18D1C1BC-01AD-4ADB-8BA5-C107B563F041/Documents/imgs/img_2012_12_24_14_24_48.jpg", "imgId": "img_2012_12_24_14_24_48"}], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_24_14_23_47" }, "Story_2012_12_24_14_24_4": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_24_14_24_4" }, "Story_2012_12_24_14_24_18": { "type": "story", "Img": [], "Video": [], "Sound": [], "Text": "点击这里填写日记", "StoryId": "Story_2012_12_24_14_24_18"}}}} };
        //        window.LIVE_DATA.init(d);



//        alert(window.FM);
//        window.setTimeout(function () {
//            console.log("run");
//            window.FM.exist("DATA", function (bool) {
//                console.log(bool);
//                alert(bool);
//                if (!bool) {
//                    c.phoneGapCommon.DATA.set('{UUID: "XXXXXXX", CreateTime: "",Diary: {}}', function () {
//                        alert(1);
//                        window.LIVE_DATA = new window.Model.DATA();
//                        eval('window._data={UUID: "XXXXXXX", CreateTime: "",Diary: {}}');
//                        window.LIVE_DATA.init(window._data);
//                        alert(2);
//                        c.to("Pages/dayList.html");
//                    })

//                } else {
//                    c.phoneGapCommon.DATA.get(function (data) {
//                        window.LIVE_DATA = new window.Model.DATA();
//                        eval("window._data=" + data);
//                        window.LIVE_DATA.init(window._data);
//                        c.to("Pages/dayList.html");
//                    });
//                }
//            });
//        }, 2000);

    })
})()