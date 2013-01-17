/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    var m = window.Model;
    var setDate = function () {
        var dateStr = c.toTime(window.currentDay.Day_ID);
        $("#storyListPage_head").html(dateStr);

    };


    $("#storyListPage").live("pagebeforecreate", function () {
        var day = window.currentDay;
        var html = day.getHTMLStoryList();
        $("#storyListContainer").html(html);
        console.log(html);
        setDate();
    });

    $("#storyListPage").live("pageshow", function () {
        var day = window.currentDay;
        $("a[storyflag]").bind(c.defaultEventName, function () {
            var storyKey = $(this).attr("storyid");
            window.currentStory = day.Story[storyKey];
            c.to("story.html");
        });

        $("#oneDayDiaryBtnAdd").bind(c.defaultEventName, function () {

            m.Story.addStory(window.currentDay); 
          
        });
    });


    $("a[del_story_btn]").die().live(c.defaultEventName, function () {
        delete (window.currentDay.Story[window.__delStoryId]);
        c.toLocal();
    });

    $("a[type='story_del_list_right_btn']").die().live(c.defaultEventName, function () {
        var id = $(this).attr("del_story_id");
        window.__delStoryId = id;


    });

})()