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
        }, 2500);
       
    };
    M.showShadow = function () {

    }
    M.explode = function (ico) {
        $(wraper).prepend(R.myCanvas);
        R.pool.explode(ico);
        var position = $(ico.DOM).offset();
        var combol=R.explodeArray.length;
        var s = new window.ShadowIco();
        s.init(ico.config, position);
        s.dieCB = function (e) {
            var hitObj = { skill: s.config, combol: combol };
            var result = A.computeDamage(hitObj);
            R.enemyBar.minusHP(result.damage);
            R.enemyBar.shakeHead();
            R.enemyBar.showNum(result.damage, result.word);

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
        window.setTimeout(function () { s.render(wraper); s.setPosition(-(minusTop-40), -(minusLeft-40)); }, 500);
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