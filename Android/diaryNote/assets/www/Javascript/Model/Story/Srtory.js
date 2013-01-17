/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    var m = window.Model;

    m.Story = function () {
        this.type = "story";
        this.Img = [];
        this.Video = [];
        this.Sound = [];
        this.Text = "";
        this.StoryId = "";
    };

    m.Story.prototype.addImg = function (CB) {
        var timeFormat = c.getTimeFormat();
        c.phoneGapCommon.Img.getPuicure("img_" + timeFormat, function (FileEntry) {
            var img = new m.Img();
            img.init({
                type: "img",
                urlPath: FileEntry.toURI(),
                createTime: timeFormat,
                filePath: FileEntry.fullPath,
                imgId: "img_" + timeFormat
            });
            window.currentStory.Img.push(img);
            CB(img);
            c.toLocal();
        });
    };
    m.Story.prototype.addVideo = function (CB) {
        var timeFormat = c.getTimeFormat();
        c.phoneGapCommon.Video.getVideo("video_" + timeFormat, function (FileEntry) {
            var video = new m.Video();
            video.init({
                type: "video",
                urlPath: FileEntry.toURI(),
                createTime: timeFormat,
                filePath: FileEntry.fullPath,
                videoId: "video_" + timeFormat
            });
            window.currentStory.Video.push(video);
            CB(video);
            c.toLocal();
        });
    };
    m.Story.prototype.addSound = function (CB) {
        var timeFormat = c.getTimeFormat();
        c.phoneGapCommon.Audio.getAudio("sound_" + timeFormat, function (FileEntry) {
            var sound = new m.Sound();
            sound.init({
                type: "sound",
                urlPath: FileEntry.toURI(),
                createTime: timeFormat,
                filePath: FileEntry.fullPath,
                soundId: "sound_" + timeFormat
            });
            window.currentStory.Sound.push(sound);
            CB(sound);
            c.toLocal();
        });
    };

    m.Story.prototype.setText = function (text) {
        this.Text = Text;
    };



    m.Story.prototype.getImgHTML = function () {
        var result = [];
        for (var i = 0; i < this.Img.length; i++) {
            var img = this.Img[i];
            result.push(img.getHTML());
        };
        return result.join("");
    };

    m.Story.prototype.getSoundHTML = function () {
        var result = [];
        for (var i = 0; i < this.Sound.length; i++) {
            var sound = this.Sound[i];
            result.push(sound.getHTML());
        };
        return result.join("");
    };

    m.Story.prototype.getVideoHTML = function () {
        var result = [];
        for (var i = 0; i < this.Video.length; i++) {
            var video = this.Video[i];
            result.push(video.getHTML());
        };
        return result.join("");
    };

    m.Story.prototype.init = function (STORY) {
        this.initImg(STORY.Img);
        this.initSound(STORY.Sound);
        this.initVideo(STORY.Video);
        this.StoryId = STORY.StoryId;
        this.Text = STORY.Text;
    }

    m.Story.prototype.initImg = function (ImgArray) {
        for (var n in ImgArray) {
            var img_date = ImgArray[n];
            var img = new m.Img();
            img.init(img_date);
            this.Img.push(img);
        }
    }

    m.Story.prototype.initSound = function (SoundArray) {
        for (var n in SoundArray) {
            var sound_date = SoundArray[n];
            var sound = new m.Sound();
            sound.init(sound_date);
            this.Sound.push(sound);
        }
    }


    m.Story.prototype.initVideo = function (VideoArray) {
        for (var n in VideoArray) {
            var video_date = VideoArray[n];
            var video = new m.Video();
            video.init(video_date);
            this.Video.push(video);
        }
    };

    m.Story.prototype.getImgPath = function () {
        var path;
        if (this.Img[0]) {
            path = this.Img[0].urlPath;
        } else {
            path = "Default.jpg"
        }
        return path;
    }

    m.Story.prototype.getHTML = function () {
        var _this = this;
        var result = m.Story.template.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return _this.StoryId; break;
                case "{1}": return _this.getImgPath(); break;
                case "{2}": return _this.Text; break;
                case "{3}": return _this.StoryId; break;
            }
        });
        return result;
    }
    m.Story.template = [
       	'		<li><a storyFlag  storyID={0}>',
		'		<img src="{1}" style="width:100%; height:100%">',
		'		<h4>{2}</h4>',
		'		</a><a del_story_id="{3}"  href="del_story.html"  type="story_del_list_right_btn" data-rel="dialog" data-transition="pop"  ></a>',
		'	</li>'
    ].join("");


    m.Story.addStory = function (Day) {
        var D = window.LIVE_DATA;
        var time = c.getTimeFormat();
        var _array = time.split("_");
        var today = "Day_" + _array[0] + "_" + _array[1] + "_" + _array[2];
        var oragStoryObj = {
            Img: [],
            Video: [],
            Sound: [],
            Text: "点击这里填写日记",
            StoryId: "Story_" + time

        };
        var oragDay = {
            Day_ID: today,
            Story: {
            }
        };
        if (Day) {
            var newStory = new m.Story();
            newStory.init(oragStoryObj);
            window.currentDay = Day;
            window.currentStory = newStory;
            Day.Story["Story_" + time] = newStory;
            c.to("story.html");
        } else {
            if (D.Diary[today]) {
                var newStory = new m.Story();
                newStory.init(oragStoryObj);
                window.currentDay = D.Diary[today];
                window.currentStory = newStory;
                D.Diary[today].Story["Story_" + time] = newStory;
                c.to("story.html");
            } else {
                oragDay.Story["Story_" + time] = {
                    Img: [],
                    Video: [],
                    Sound: [],
                    Text: "点击这里填写日记",
                    StoryId: "Story_" + time
                }
                var day = new m.Day();
                day.init(oragDay);
                D.Diary[today] = day;
                window.currentDay = day;
                window.currentStory = day.Story["Story_" + time];
                c.to("story.html");
            }

        }
    }

})()