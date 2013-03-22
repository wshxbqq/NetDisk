(function () {
    var icfg = window.ICO_CONFIG;
    var R = window.RunTime = {};
    R.isA = false;//知否在执行动画
    R.IcoPool = [icfg.sk1, icfg.sk2, icfg.sk3, icfg.sk4, icfg.sk5, icfg.sk6, icfg.sk8];
    R.currentEnemy = window.EnemyConfig.enemy1;
    R.currentPlayer = window.Player = {
        MaxHP: 2342,
        HP:2342,
        img: "R/Img/Player/nv.png",
        name: "美女",
        sound: "",
        damage: [100, 200],
        criticalPercent: 30, //暴击几率
        criticalAddtion: 2,   //暴击后 伤害提升
        dodgePercent: 20,
        withstandPercent: 20

    };

    R.explodeArray = [];
    R.pool = null;
    R.dotArray = [];

    //-当穿上装备以后，效果方法都定义在这里。
    R.extSkillArray = [];

})()