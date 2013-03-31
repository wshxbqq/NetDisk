/// <reference path="Config.js" />

(function () {
    var raceCfg = window.CONFIG_RACE = {};
    raceCfg.orc = {
        name: "BloodElf",
        sound:{},
        ico: {
            width: 200,
            height:200,
            frameCount: 150,
            frameWidth: 65,
            frameInterval: 40,
            img: "R/Img/Player/blood_elf_ico.png"
        },
        body: {
            width: 300,
            height: 374,
            frameCount: 150,
            frameWidth: 300,
            frameInterval: 40,
            img: "R/Img/Player/blood_elf_stand.png"
        },
        walk: {
            width: 300,
            height: 353,
            frameCount: 18,
            frameWidth: 300,
            frameInterval: 40,
            img: "R/Img/Player/blood_elf_walk.png"
        },
        weapon:"R/Img/Player/player1.png",
        MaxHP: 2342,
        damageP: [100, 200],
        damageM: [100, 200],
        criticalPercent: 30, //暴击几率
        criticalAddtion: 2,   //暴击后 伤害提升
        dodgePercent: 20,
        withstandPercent: 20

    };
    
    raceCfg.bloodElf = {

    };

    raceCfg.human = {

    };
})()