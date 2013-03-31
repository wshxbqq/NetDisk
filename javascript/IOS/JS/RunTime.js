(function () {
    var icfg = window.ICO_CONFIG;
    var R = window.RunTime = {};
    R.isA = false;//知否在执行动画
    R.IcoPool = [icfg.sk1, icfg.sk2, icfg.sk3, icfg.sk4, icfg.sk5, icfg.sk6, icfg.sk8];
    R.currentEnemy = window.EnemyConfig.enemy1;
    R.currentPlayer = window.Player = {
        MaxHP: 2342,
        HP:2342,
        img: "R/Img/Player/player1.png",
        name: "BloodElf",
        sound: "",
        damage: [100, 200],
    };


    R.explodeArray = [];
    R.pool = null;
    R.dotArray = [];
    R.clipArray = [];
})()