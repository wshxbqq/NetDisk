/// <reference path="../../../../Libs/Jquery/jquery.js" />

/// <reference path="../../../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />

/// <reference path="../../Model.js" />

(function () {
    var c = window.Common;
    var m = window.Model;

    m.Img = function () {
        this.type = "img";
        this.urlPath = "";
        this.createTime = "";
        this.filePath = "";
        this.imgId = "";
    };

    m.Img.prototype.getHTML = function () {
        var _this = this;
        var result = m.Img.Template.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return _this.urlPath; break;
                case "{1}": return _this.imgId; break;
            };
        });
        return result;
    };


    m.Img.Template = [
    ' <div class="center" style="margin:10px; width:60px; ;position: relative; float: left;">',
    '<div class="delBtnRightTop"><a flagFor="del"  data-role="button" data-icon="delete" data-iconpos="notext"></a>  </div>',
     '<img src="{0}" img_id={1}  type="Img"    class="roundBorder" flag="list_img" />',
     '</div>'
    ].join("");


    m.Img.prototype.init = function (IMG) {
        this.type = "img";
        this.urlPath = IMG.urlPath;
        this.createTime = IMG.createTime;
        this.filePath = IMG.filePath;
        this.imgId = IMG.imgId;
    }
})()