(function () {

    var EnemyConfig = window.EnemyConfig = {};
    
    EnemyConfig.enemy1 = {
        MaxHP: 2342,
        img: "R/Img/Head/Enemy/enemy1.png",
        name:"血色杂兵",
        sound: "",
        damage: [100, 200],
        criticalPercent: 80, //暴击几率
        criticalAddtion:2,   //暴击后 伤害提升
        dodgePercent: 20,
        withstandPercent:20
    };


//    global.startEvent = "mousedown";
//    global.moveEvent = "mousemove";
//    global.endEvent = "mouseup";
})()