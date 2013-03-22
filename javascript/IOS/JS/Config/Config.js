(function () {

    var global = window.GLOBAL_CONFIG = {};
    global.imgPath = "R/Img/";
    global.icoWidth = 78;
    global.lineLength = 9;
    global.lineCount = 8;
    global.startEvent = "touchstart";
    global.moveEvent = "touchmove";
    global.endEvent = "touchend";

    global.physics = "physics";
    global.magic = "magic";
    global.health="health";

    global.countAddtional = 0.5; // 连击的加成

//    global.startEvent = "mousedown";
//    global.moveEvent = "mousemove";
//    global.endEvent = "mouseup";
})()