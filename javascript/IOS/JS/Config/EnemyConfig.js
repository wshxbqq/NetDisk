(function () {

    var EnemyConfig = window.EnemyConfig = {};
    
    EnemyConfig.enemy1 = {
        MaxHP: 2342,
        img: "R/Img/Head/Enemy/enemy1.png",
        name:"奇美拉",
        sound: "",
        damage: [100, 200],
        criticalPercent: 90, //暴击几率
        criticalAddtion:2,   //暴击后 伤害提升
        dodgePercent: 20,
        withstandPercent: 20,
        frameCount: 33,
        frameWidth: 100,
        frameInterval: 40
    };


//    global.startEvent = "mousedown";
//    global.moveEvent = "mousemove";
//    global.endEvent = "mouseup";
})()