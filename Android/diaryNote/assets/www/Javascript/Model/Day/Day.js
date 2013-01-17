/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    var m = window.Model;

    m.Day = function () {
        this.type = "day";
        this.Day_ID = "";
        this.Day_Img_Path = "";
        this.Story = {};
    };

    m.Day.prototype.init = function (DAY) {
        this.Day_ID = DAY.Day_ID;
        this.Day_Img_Path = DAY.Day_Img_Path;
        for (var n in DAY.Story) {
            var story_data = DAY.Story[n];
            var story = new m.Story();
            story.init(story_data);
            this.Story[n] = story;
        }
    };
    m.Day.prototype.getHTML = function () {
        var _this = this;
        var result = m.Day.template.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return _this.Day_ID; break;
                case "{1}": return _this.getImgPath(); break;
                case "{2}": return _this.getStoryCount(); break;
                case "{3}": return _this.Day_ID; break;
                case "{4}": return _this.Day_ID.split("_")[2] + "月 " + _this.Day_ID.split("_")[3] + " 日"; break;
            }
        });
        return result;
    };

    m.Day.prototype.getImgPath = function () {
        var _this = this;
        var result = "";
        if (_this.Story) {
            var s = c.objExt.getFirst(_this.Story).value;
            if (s.Img.length === 0) {
                result = "default.jpg"
            } else { 
                var url = s.Img[0].urlPath;
                result = url;
            }
            
        }
        return result;
    };

    m.Day.prototype.getStoryCount = function () {
        var _this = this;
        var count = 0;
        for (var i in _this.Story) {
            if (i.indexOf("Story") > -1) {
                count++;
            }
        }
        return count;
    };

    m.Day.prototype.getHTMLStoryList = function () {
        var _this = this;
        var storyListHtml = [];
        for (var i in _this.Story) {
            var story = _this.Story[i];
            storyListHtml.push(story.getHTML());
        }
        return storyListHtml.join("");
    };


    m.Day.template = [
    	'		<li><a dayFlag dayID="{0}">',
		'		<img src="{1}" style="width:100%; height:100%">',
		'		<h4 style="color:#AA0C00">{4}</h4>',
		'		<h5 style="color:">共{2}篇日记</h5>',
		'		</a><a href="del_day.html" del_day_id="{3}" type="day_del_list_right_btn" data-rel="dialog" data-transition="pop" ></a>',
		'	</li>'
    ].join("");





})()