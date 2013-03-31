/// <reference path="Common/Common.js" />
/// <reference path="JSFile/Ico/Ico.js" />
/// <reference path="JSFile/Ico/IcoPool.js" />
/// <reference path="JSFile/Ico/line.js" />
/// <reference path="JSFile/Ico/ShadwIco.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var A = window.Ansy;
    var M = window.Manager = function () {

    };

    M.showFirWork = function (x, y) {
        
        R.fireWork.addBombs(x, y);
        window.setTimeout(function () {
            $(R.myCanvas).remove();
            R.isA = false;
        }, 3000);
    };

    M.initDATA = function (DATA) {  //入口方法
        var race = window.CONFIG_RACE[DATA.race];
        R.currentPlayer = {
            race: race,
            status: DATA.status,
            coin: DATA.coin,
            FM: []
        };

        for (var i in DATA.FM) {
            var FM_STR = DATA.FM[i];
            R.currentPlayer.FM.push(window.ConfigFM[FM_STR]);
        };
    };

    M.showShadow = function () {

    }
    M.explode = function (ico) {
        $(window.RunTime.pool.DOM).prepend(R.myCanvas);
        R.pool.explode(ico);
        var position = $(ico.DOM).offset();
        var combol=R.explodeArray.length;
        var s = new window.ShadowIco();
        s.init(ico.config, position);

        if (ico.config.type == G.health) {//区分是治疗技能 还是伤害技能
            s.dieCB = function () {
                var hitObj = { skill: s.config, combol: combol };
                var result = A.computeHealth(hitObj);
                R.playerBar.minusHP(-result.health);
                R.playerBar.shakeHead();

                var resultArray = [];
                if (result.health > 0) {
                    resultArray.push(window.Num.getDamageNumConfigObj(-result.health));
                };
                if (result.health > 0) {
                    resultArray.push(window.Num.getNameNumConfigObj(hitObj.skill.name));
                };
                if (result.word) {
                    resultArray.push(window.Num.getStatusNumConfigObj(result.word));
                };
                

                var config = { text: resultArray, ico: ico };
                R.playerBar.showNum(config);


                window.setTimeout(function () {
                    window.EnemyBar.attckpalyer();
                    window.setTimeout(function () { R.enemyBar.dotUpdate(); }, 300);

                }, 1000);
            }
            var p2 = $(R.playerBar.headDOM).offset();

            var minusTopPlayer = C.int(position.top) - C.int(p2.top);
            var minusLeftPlayer = C.int(position.left) - C.int(p2.left);
            window.setTimeout(function () { s.render(wraper); s.setPosition(-(minusTopPlayer - 40), -(minusLeftPlayer - 40)); }, 500);

        } else {
            s.dieCB = function (e) {
                var hitObj = { skill: s.config, combol: combol };
                var result = A.computeDamage(hitObj);
                R.enemyBar.minusHP(result.damage);
                R.enemyBar.shakeHead();
                var isCritial = 0;
                var resultArray = [];
                if (result.damage > 0) {
                    resultArray.push(window.Num.getDamageNumConfigObj(result.damage));
                };
                if (result.damage > 0) {
                    resultArray.push(window.Num.getNameNumConfigObj(hitObj.skill.name));
                };
                if (result.word) {
                    resultArray.push(window.Num.getStatusNumConfigObj(result.word));
                    
                };
                if (result.isCritial) {
                    isCritial = 1;
                };
                if (result.isDodge || result.isWithstandPercent) {
                    isCritial = 0;
                };
                

                var config = { text: resultArray, isCritial: isCritial, ico: ico };
                R.enemyBar.showNum(config);


                if (s.config.dot) {
                    R.enemyBar.addDot(s.config, combol);
                }

                window.setTimeout(function () {
                    window.EnemyBar.attckpalyer();
                    window.setTimeout(function () { R.enemyBar.dotUpdate(); }, 300);

                }, 1000);
            };

            var p1 = $(R.enemyBar.headDOM).offset();

            var minusTop = C.int(position.top) - C.int(p1.top);
            var minusLeft = C.int(position.left) - C.int(p1.left);
            window.setTimeout(function () { s.render(wraper); s.setPosition(-(minusTop - 40), -(minusLeft - 40)); }, 500);
        }

    };

    M.sences = {};

    M.showBattleSence = function () {
        var battleSence = M.sences.battleSence = C.createDom("div", { "class": "BattleGround" }, {});
        $(wraper).append(battleSence);
        R.enemyBar = new window.EnemyBar();
        R.enemyBar.init(R.currentEnemy);
        R.enemyBar.render(battleSence);

        R.playerBar = new window.PlayerBar();
        R.playerBar.init(R.currentPlayer);
        R.playerBar.render(battleSence);

        var P = window.IcoPool;
        R.pool = new P();
        R.pool.init();
        R.pool.render(battleSence);
    };


})()