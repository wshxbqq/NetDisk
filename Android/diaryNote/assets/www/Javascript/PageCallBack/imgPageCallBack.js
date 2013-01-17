/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;

    var adjustImg = function (img) {
        $(img).removeAttr("style");
        var width = $(img).width();
        var height = $(img).height();
        var parentWidth = $(img).parent().parent().width();
        var parentHeight = $(img).parent().parent().height();
        if (width > height) {
            $(img).css({ "-webkit-transform": "translateX(" + parentWidth + "px) rotate(90deg) ", "width": parentHeight + "px", "height": parentWidth + "px", "-webkit-transform-origin-x": "0", "-webkit-transform-origin-y": "0" });
        }
        window.img = img;
        $("#story_content").height($("#story_content").parent().height());
    }

    $("#imgPage").live("pageshow", function () {
        //        window.currentImgArray = S.Img;
        //        var img_id = $(this).attr("img_id");
        //        window.currentImgIndex = getImgIndex(img_id);

        var currentImg = window.currentImgArray[window.currentImgIndex];
        var length = window.currentImgArray.length;
        $("#current_img").attr("src", currentImg.urlPath + "?_tmp=" + Math.random())
        .bind("load", function (e) {

            adjustImg(this);
        })
        .bind(c.defaultEventName, function () {
            if ((window.currentImgIndex + 1) < length) {
                window.currentImgIndex++;
                var c = window.currentImgArray[window.currentImgIndex];
                $("#current_img").attr("src", c.urlPath)
            } else {
                window.currentImgIndex = 0;
                var first = window.currentImgArray[window.currentImgIndex];
                $("#current_img").attr("src", first.urlPath)
            }
            console.log(window.currentImgIndex);

        })
    })

})()