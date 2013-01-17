/// <reference path="../../../../Libs/Jquery/jquery.js" />
/// <reference path="../../../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Model.js" />
(function () {
    var c = window.Common;
    var m = window.Model;

    m.Sound = function () {
        this.type = "sound";
        this.urlPath = "";
        this.createTime = "";
        this.filePath = "";
        this.soundId = "";
    };
    m.Sound.prototype.getHTML = function () {
        var _this = this;
        var result = m.Sound.Template.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return _this.urlPath; break;
                case "{1}": return _this.soundId; break;
            };
        });
        return result;
    }
    m.Sound.prototype.init = function (Sound) {
        this.type = "img";
        this.urlPath = Sound.urlPath;
        this.createTime = Sound.createTime;
        this.filePath = Sound.filePath;
        this.soundId = Sound.soundId;
    }

    m.Sound.Template = [
   '<div class="center" style="margin-top:40px; width:80%; position:relative; border: 1px white solid;border-radius: 3px;">',
     '<div class="delBtnRightTop"><a flagFor="del"  data-role="button" data-icon="delete" data-iconpos="notext"></a>  </div>',
     '<video src="{0}" width="100%" sound_id={1}  type="Sound" controls="controls"  class="roundBorder"  />',
   ' </div>',
    
    ].join("");

})()