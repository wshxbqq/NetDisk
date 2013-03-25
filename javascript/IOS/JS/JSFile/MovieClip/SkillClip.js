/// <reference path="../Common/Common.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;

    //config  
            //frameCount: 33,
            //frameWidth: 100,
    //frameInterval:100
        //count  播放几次？
    var sc = window.SkillClip = function (config,cb) {
        this.ID = null;

        this.DOM = null;

        this.config = config;

        this.interval = null;

        this.frame = 0;

        this.countLoop = 0;

        this.cb = cb;
    };

    

    sc.prototype.render = function (position) {
        $(this.DOM).css({ "top": (C.int(position.top) - 10) + "px", "left":   (C.int(position.left) - 20) + "px" });
       $(wraper).prepend(this.DOM);

    };

    sc.prototype.init = function (position) {
        var _this = this;
        var div = C.createDom("div", { "class": "skillClip" }, { "background-image": "url('" + this.config.img + "')" });
        $(div).css({ "width": this.config.width + "px", "height": this.config.height + "px" });
        this.DOM = div;
        this.render(position);
        this.interval = window.setInterval(function () {
            _this.update();
        }, this.config.frameInterval);
    };

    sc.prototype.update = function () {
        var _this = this;
        this.frame++;
        var left = this.config.frameWidth * (this.frame % this.config.frameCount);
        $(this.DOM).css("background-position-x", -left+"px");
        if (this.frame % this.config.frameCount === 0) {
            this.countLoop++;
        }
        if (this.config.count>0) {
            if (this.config.count <= this.countLoop) {
                window.clearInterval(this.interval);
                _this.cb(_this);
            }
        }
    };

    sc.prototype.remove = function () {
        window.clearInterval(this.interval);
    };

    sc.showWithPlayer = function (cfg) {
        var position = $(R.playerBar.headDOM).offset();
        var sc1 = new sc(cfg, function (_this) {
            $(_this.DOM).remove();

        });
        sc1.init(position);
    };

    sc.showWithEnemy = function (cfg) {
        var position = $(R.enemyBar.headDOM).offset();
        var sc1 = new sc(cfg, function (_this) {
            $(_this.DOM).remove();

        });
        sc1.init(position);
    };


})()