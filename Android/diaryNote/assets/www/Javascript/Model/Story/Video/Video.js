/// <reference path="../../../../Libs/Jquery/jquery.js" />
/// <reference path="../../../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Model.js" />

(function () {
    var c = window.Common;
    var m = window.Model;

    m.Video = function () {
        this.type = "video";
        this.urlPath = "";
        this.createTime = "";
        this.filePath = "";
        this.videoId = "";
    };
    m.Video.prototype.getHTML = function () {
        var _this = this;
        var result = m.Video.Template.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return _this.urlPath; break;
                case "{1}": return _this.videoId; break;
            };
        });
        return result;
    };

    m.Video.prototype.init = function (VIDEO) {
        this.type = "video";
        this.urlPath = VIDEO.urlPath;
        this.createTime = VIDEO.createTime;
        this.filePath = VIDEO.filePath;
        this.videoId = VIDEO.videoId;
    }

    m.Video.Template = [
    ' <div class="center" style=" margin-top:40px; width:80% ;position: relative;border: 1px white solid;border-radius: 3px;">',
      '<div class="delBtnRightTop"><a flagFor="del"  data-role="button" data-icon="delete" data-iconpos="notext"></a>  </div>',
     '<video src="{0}" video_id={1} type="Video"  width="100%"  controls="controls"  class="roundBorder"  />',
     '</div>'
    ].join("");

})()