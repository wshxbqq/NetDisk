/// <reference path="../Common/Common.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;
    var A = window.Ansy;

    var E = window.EnemyBar = function () {
        this.ID = null;

        this.DOM = null;
        this.headDOM = null;
        this.HPBar = null;
        this.DotBar = null;
        this.HPBarInner = null;
        this.name = null;
        this.HP = null;
        this.MaxHP = null;
        this.parent = null;

    };

    
    E.prototype.init = function (config) {
        this.ID = "ICO_" + Math.random();
        this.config = config;
        this.MaxHP = config.MaxHP;
        this.HP = config.MaxHP;
        this.initDOM();
    };

    E.prototype.remove = function () {
        $(this.DOM).remove();
    };

    E.prototype.shakeHead = function () {
        var _this = this;
        window.setTimeout(function () {
            $(_this.headDOM).removeClass("enemyBarShake");
            window.setTimeout(function () {
                $(_this.headDOM).addClass("enemyBarShake");
            }, 0);
        },0);
    };

    E.prototype.minusHP = function (count) {
        var percent = 0;
        if (count < this.HP) {
            this.HP = this.HP - count;
            percent = C.int((this.HP / this.MaxHP) * 100);
        };
        $(this.HPBarInner).css("width", percent + "%");
    };

    E.prototype.showNum = function (numConfig) {



        var num = new window.Num(numConfig);
        num.init();
        var position = $(this.headDOM).offset();


        var top = C.int(position.top) + 50;
        var left = C.int(position.left) + 100;

        var p = { "top": top + "px", "left": left + "px"};
        $(num.DOM).css(p);
        if (numConfig.isCritial) {
            $(num.DOM).addClass("enemyIcoNum1");
        } else {
            $(num.DOM).addClass("enemyIcoNum");
        }
        
        num.show();
    }

    E.prototype.render = function (parent) {

        this.parent = parent;
        $(parent).append(this.DOM);

    };

    E.prototype.addDot = function (skill, combol) {
        var dotObj = {};
        dotObj.img = C.createDom("img", { "src": skill.img, "type_id": skill.id }, {});
        dotObj.damage = skill.dot.damage;
        dotObj.round = skill.dot.round;
        dotObj.skill = skill;
        dotObj.combol = combol;
        R.dotArray.push(dotObj);

        $(this.DotBar).append(dotObj.img);

    };

    E.prototype.dotUpdate = function () {
        var newDotArray = [];
        var dotDamage = 0;
        for (var i in R.dotArray) {
            var dot = R.dotArray[i];
            var result = A.computeDotDamage(dot);
            var damage = result.damage;
            var name = dot.skill.name;
            (function (d,name,img) {
                window.setTimeout(function () {
                    R.enemyBar.minusHP(d);
                    var numConfig = window.Num.getDamageNumConfigObj(d);
                    var nameConfig = window.Num.getNameNumConfigObj("");
                    numConfig.size = "20px";
                    nameConfig.size = "20px";
                    var config = { text: [numConfig, nameConfig],icoSize:20, ico: { config: { img: img } } };
                    R.enemyBar.showNum(config);

                }, 300 * i);
            })(damage, name, dot.skill.img)
           
            

            dot.round--;
            if (dot.round > 0) {
                newDotArray.push(R.dotArray[i]);
            } else {
                $(dot.img).remove();
            }
        };
        R.dotArray = newDotArray;


    }

    E.prototype.initDOM = function () {
        var div_enemyBar = C.createDom("div", { "class": "enemyBar" }, {});
        var div_enemyHeadIcoBorder = C.createDom("div", { "class": "enemyHeadIcoBorder" }, { });
        var div_enemyHeadIco = C.createDom("div", { "class": "enemyHeadIco" }, { "background-image": "url('" + this.config.img + "')" });
        var div_dotbar = C.createDom("div", { "class": "dotBar" }, {});
        var div_HPBarInner = C.createDom("div", { "class": "enemyHPBarInner" }, {});
        var div_enemyHPBar = C.createDom("div", { "class": "enemyHPBar" }, {  });
        var div_name = C.createDom("div", { "class": "name" }, {});
        $(div_name).html(this.config.name);
        $(div_enemyHPBar).append(div_HPBarInner);
        $(div_enemyHeadIcoBorder).append(div_enemyHeadIco);
        $(div_enemyBar).prepend(div_enemyHeadIcoBorder)
        .prepend(div_enemyHPBar)
        .prepend(div_dotbar)
        .prepend(div_name);

        this.DOM = div_enemyBar;
        this.HPBarInner = div_HPBarInner;
        this.headDOM = div_enemyHeadIco;
        this.HPBar = div_enemyHPBar;
        this.DotBar = div_dotbar;
        this.name = div_name;

        var  enemyClicp1 = new MovieClip(div_enemyHeadIco, this.config);
        enemyClicp1.init();
        R.clipArray.push(enemyClicp1);
    };

    E.attckpalyer = function () {

        var result = A.computeDamageToPlayer();
        R.playerBar.minusHP(result.damage);
        R.playerBar.shakeHead();



        var resultArray = [];
        if (result.damage > 0) {
            resultArray.push(window.Num.getDamageNumConfigObj(result.damage));
        };
        if (result.word) {
            resultArray.push(window.Num.getStatusNumConfigObj(result.word));
        };

        var config = { text: resultArray };

        R.playerBar.showNum(config);


    };
   



})()