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
    var mc = window.MovieClip = function (dom,config,cb) {
        this.ID = null;

        this.DOM = dom;

        this.config = config;

        this.interval = null;

        this.frame = 0;

        this.countLoop = 0;

        this.cb = cb;
    };

    
    mc.prototype.init = function () {
        var _this=this;
        this.interval = window.setInterval(function () {
            _this.update();
        }, this.config.frameInterval);
    };

    mc.prototype.update = function () {
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

    mc.prototype.remove = function () {
        window.clearInterval(this.interval);
    }

   


})()