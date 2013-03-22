/// <reference path="../Common/Common.js" />

(function () {
    var A = window.Ansy = function () { };

    //hitObj {} skill combol
    A.computeDamage = function (hitObj) {
        var C = window.Common;
        var global = window.GLOBAL_CONFIG;
        var R = window.RunTime;


        var result = { type: 0, skill: skill, combol: combol };
        var skill = hitObj.skill;
        var combol = hitObj.combol;

        var damage = C.getRandom(skill.damage[0], skill.damage[1],1);
        damage +=C.int( (damage * global.countAddtional) * combol);

        var isCritial = C.getRandom(0, 100, 1);
        if (isCritial < R.currentPlayer.criticalPercent) {
            damage = damage * R.currentPlayer.criticalAddtion;
            result.isCritial = true;
            result.word = "暴击";
        };

        var isDodge = C.getRandom(0, 100, 1);
        if (isDodge < R.currentEnemy.dodgePercent) {
            damage = 0;
            result.isDodge = true;
            result.word = "闪躲";
        };

        var isWithstand = C.getRandom(0, 100, 1);
        if (isWithstand < R.currentEnemy.withstandPercent) {
            damage = 0;
            result.isWithstandPercent = true;
            result.word = "招架";
        };


        result.damage = damage;
        
        for (var i in R.extSkillArray) {
                R.extSkillArray[i](result);
        };

        return result;
    };

    A.computeDamageToPlayer = function () {
        var C = window.Common;
        var global = window.GLOBAL_CONFIG;
        var R = window.RunTime;


        var result = {type:1};
   

        var damage = C.getRandom(R.currentEnemy.damage[0], R.currentEnemy.damage[1], 1);

        var isCritial = C.getRandom(0, 100, 1);
        if (isCritial < R.currentEnemy.criticalPercent) {
            damage = damage * R.currentEnemy.criticalAddtion;
            result.isCritial = true;
            result.word = "暴击";
        };

        var isDodge = C.getRandom(0, 100, 1);
        if (isDodge < R.currentPlayer.dodgePercent) {
            damage = 0;
            result.isDodge = true;
            result.word = "闪躲";
        };

        var isWithstand = C.getRandom(0, 100, 1);
        if (isWithstand < R.currentPlayer.withstandPercent) {
            damage = 0;
            result.isDodge = true;
            result.word = "招架";
        };


        result.damage = damage;

        for (var i in R.extSkillArray) {
            R.extSkillArray[i](result);
        };

        return result;
    };



    //dotObj.img = C.createDom("img", { "src": skill.img, "type_id": skill.id }, {});
    //dotObj.damage = skill.dot.damage;
    //dotObj.round = skill.dot.round;
    //dotObj.skill = skill;

    A.computeDotDamage = function (dot) {
        var C = window.Common;
        var global = window.GLOBAL_CONFIG;
        var R = window.RunTime;


        var result = { type: 2 };
        var combol = dot.combol;


        var damage = C.getRandom(dot.damage[0], dot.damage[1], 1);
        damage += C.int((damage * global.countAddtional) * combol);

        result.damage = damage;

        for (var i in R.extSkillArray) {
                R.extSkillArray[i](result);
        };

        return result;
    };


    A.computeHealth = function (hitObj) {
        var C = window.Common;
        var global = window.GLOBAL_CONFIG;
        var R = window.RunTime;


        var result = { type:3, skill: skill, combol: combol };
        var skill = hitObj.skill;
        var combol = hitObj.combol;


        var health = C.getRandom(skill.health[0], skill.health[1], 1);
        health += C.int((health * global.countAddtional) * combol);
        result.health = health;

        var isCritial = C.getRandom(0, 100, 1);
        if (isCritial < R.currentPlayer.criticalPercent) {
            health = health * R.currentPlayer.criticalAddtion;
            result.isCritial = true;
            result.word = "暴击";
        };

        for (var i in R.extSkillArray) {
            R.extSkillArray[i](result);
        };

        return result;
    };



})()