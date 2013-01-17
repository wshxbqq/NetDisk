/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;

    var setDate = function () {
        var dateStr = c.toTime(window.currentDay.Day_ID);
        $("#storyPage_head").html(dateStr);

    };

    var getImgIndex = function (img_id) {
        var S = window.currentStory;
        var index;
        for (var i in S.Img) {
            if (S.Img[i].imgId == img_id) {
                index = i;
                break;
            }

        };
        return window.parseInt(index);


    }


    $("img[flag='list_img']").die().live(c.defaultEventName, function () {
            var S = window.currentStory;
            window.currentImgArray = S.Img;
            var img_id = $(this).attr("img_id");
            window.currentImgIndex = getImgIndex(img_id);
            c.to("Img.html");
        });



    $("a[flagFor='del']").die().live("touchend", function () {
        var objDOM = $(this).parent().next();
        var id;
        var type = objDOM.attr("type");
        switch (type) {
            case "Img":
                id = $(objDOM).attr("img_id");
                var array = window.currentStory[type];
                for (var i = 0; i < array.length; i++) {
                    if (array[i].imgId == id) {
                        var obj = array.splice(i, 1);
                        c.toLocal();
                    }
                };
                break;
            case "Sound":
                id = $(objDOM).attr("sound_id");
                var array = window.currentStory[type];
                for (var i = 0; i < array.length; i++) {
                    if (array[i].soundId == id) {
                        var obj = array.splice(i, 1);
                        c.toLocal();
                    }
                };
                break;
            case "Video":
                id = $(objDOM).attr("video_id");
                var array = window.currentStory[type];
                for (var i = 0; i < array.length; i++) {
                    if (array[i].videoId == id) {
                        var obj = array.splice(i, 1);
                        c.toLocal();
                    }
                };
                break;
        };
        objDOM.parent().remove();

    });

    $("#storyPage").die().live("pageshow", function () {

        var S = window.currentStory;

        var imgHTML = S.getImgHTML();
        $("#story_img_container").prepend(imgHTML);

        var soundHTML = S.getSoundHTML();
        $("#story_sound_container").prepend(soundHTML);

        var videoHTML = S.getVideoHTML();
        $("#story_video_container").prepend(videoHTML);


        

        var text = S.Text;


        $("#diaryText").html(text)
        .bind(c.defaultEventName, function () {
            var $textDOM = $(this)
            if ($textDOM.find("input").size() === 0) {
                $textDOM.html('<input value="' + $(this).html() + '" name="input1" id="diaryTextInput"></input> <div style="width:30%"> <button id="diaryTextInputOKBtn">保存</button> </div>')
                .find("input").textinput();
            }

            $("#diaryTextInputOKBtn")
            .button()
            .unbind()
            .bind(c.defaultEventName, function (e) {
                var value1 = $("#diaryTextInput").val();
                    S.Text = value1;
                    $textDOM.html(value1);
                    c.toLocal();
                e.stopPropagation();
            })

        });



        $("#addImgBtn").bind(c.defaultEventName, function () {
            S.addImg(function (img) {
                $("#story_img_container").prepend(img.getHTML());
                c.reflashDelBtn();
            });
        });

        $("#addSoundBtn").bind(c.defaultEventName, function () {
            S.addSound(function (sound) {
                $("#story_sound_container").prepend(sound.getHTML());
                c.reflashDelBtn();
            });
        });


        $("#addVideoBtn").bind(c.defaultEventName, function () {
            S.addVideo(function (video) {
                $("#story_video_container").prepend(video.getHTML());
                c.reflashDelBtn();
            });
        });

        setDate();
        c.reflashDelBtn();
    });

})()