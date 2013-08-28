﻿/// <reference path="Config.js" />

(function () {
    var icfg = window.ICO_CONFIG = {};
    var global = window.GLOBAL_CONFIG;
    icfg.sk1 = {
        id:"sk1",
        img: "R/Img/Ico/sk_1.png",
        sound:"",
        damage:[27,50],
        type: global.physics,
        name:"血之疫病",
        dot: {
            damage: [100, 200],
            round: 10
        }

    },icfg.sk2 = {
        id:"sk2",
        img: "R/Img/Ico/sk_2.png",
        sound:"",
        damage: [27, 50],
        type: global.physics,
        name: "致死打击",
        dot: null
    },icfg.sk3 = {
        id:"sk3",
        img: "R/Img/Ico/sk_3.png",
        sound:"",
        damage: [27, 50],
        name: "献祭",
        type: global.physics,
        dot: {
            damage: [9, 10],
            round: 4
        }
    },icfg.sk4 = {
        id:"sk4",
        img: "R/Img/Ico/sk_4.png",
        sound:"",
        damage: [27, 50],
        type: global.physics,
        name: "邪恶攻击",
        dot: null
    },icfg.sk5 = {
        id:"sk5",
        img: "R/Img/Ico/sk_5.png",
        sound:"",
        damage: [27, 50],
        type: global.physics,
        name: "剔骨",
        dot: null
    },icfg.sk6 = {
        id:"sk6",
        img: "R/Img/Ico/sk_6.png",
        sound:"",
        damage: [27, 50],
        type: global.physics,
        name: "撕裂",
        dot: {
            damage: [9, 10],
            round: 4
        }
    },icfg.sk7 = {
        id:"sk7",
        img: "R/Img/Ico/sk_7.png",
        sound:"",
        damage: [27, 50],
        type: global.physics,
        name: "死亡脚步",
        dot: null
    }, icfg.sk8 = {
        id: "sk8",
        img: "R/Img/Ico/sk_8.png",
        sound: "",
        health: [270, 500],
        type: global.health,
        name: "圣光术",
        dot: null
    }
})()