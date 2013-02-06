
var FRAME = 60;
var FRAME_COUNT = 0;
var SEND_FRAME = 30;
var SERVER = "10.130.134.1:8888";
var ID = null;

var mark_me = 0;
var mark_he = 0;

var ballObj = {x:460,y:300,_x:2,_y:1};
var b1Obj = {x:0,y:300};
var b2Obj = { x: 940, y: 300 };
var speed = 0;

var bg = $(".bg");
var jalert = $(".jalert").bind("click touchend", function () {
    $(this).hide();
})


var MY={};
var HE = {};
var b1 = $(".b1");
var b2 = $(".b2");
var ball = $(".ball");
var textContainer = $(".textContent");



var ST = {};

ST.nextFrame = function () {
    var flag=ST.nextBallPosition();
    ansy.setBall();
    if (flag) {
        ansy.changeBall(Object);
    };
    if (!ansy.win()) {
        ansy.newGame();
    };
    FRAME_COUNT++;
    
    ansy.updateB();
};

ST._inB1 = function () {
    var result = 0;
    if (b1Obj.x < ballObj.x && (b1Obj.x + 20) > ballObj.x && b1Obj.y < ballObj.y && (b1Obj.y + 100) > ballObj.y) {
        result = 1;
    }
    return result;
};

ST._inB2 = function () {

    var result = 0;

    if ((b2Obj.x - 20) < ballObj.x && (b2Obj.x + 400) > ballObj.x && b2Obj.y < ballObj.y && (b2Obj.y + 100) > ballObj.y) {
        result = 1;
    };

    return result;
};

ST.nextBallPosition = function () {

    var result;
    ballObj.x += ballObj._x;
    ballObj.y += ballObj._y;

    if (ST._inB1() && MY.p=="left") {
        ballObj._x = -ballObj._x;
        result = true;
    };

    if (ST._inB2() && MY.p == "right") {
        ballObj._x = -ballObj._x;
        result = true;
    };

    if (ballObj.y < 0 || ballObj.y>620) {
        ballObj._y = -ballObj._y;
    }
    return result;
};


window.socket = io.connect(SERVER);

socket.on('connect', function (connectMsg) {
    dom.changeReadyTip(1); //更换标题   已连接
    socket.emit("updateFreelayer");


    socket.on('updateFreelayer', function (data) {
        dom.fillPlayerList(data.data);
        console.log(data.data);
    });
    socket.on('updateB', function (data) {
        HE.bObj.y = data.data;
        console.log(data);
    });
    socket.on('newGame', function (data) {
        ballObj.x = data.x;
        ballObj.y = data.y;
        ballObj._x = data._x;
        ballObj._y = data._y;
        ansy.start(ballObj._x, ballObj._y);
    });
    
    socket.on('start', function (data) {
        var p = data.data;
        ansy.who(p);

        ansy.newGame();
        Timer.start();
    });

    socket.on('ballChange', function (data) {
        ballObj.x = data.x;
        ballObj.y = data.y;
        ballObj._x = data._x;
        ballObj._y= data._y;
    });

    socket.on('message', function (msg) {
        console.log(msg);
        if (msg.y != undefined) {
            HE.bObj.y = msg.y;
        }
        if (msg.ball != undefined) {
            ballObj.x = msg.ball.x;
            ballObj.y = msg.ball.y;

            ballObj._x = msg.ball._x;
            ballObj._y = msg.ball._y;

            ballObj.speed=msg.ball.speed;
        }
        if (msg.reset != undefined) {
            ansy.start();
        };

        if (msg.text != undefined) {
            ansy.showText(msg.ID, msg.text);
        }

        if (msg.showServerText != undefined) {
            ansy.showServerText(msg.showServerText);
        }


        if (msg.init != undefined) {
            ansy.who(connectMsg.position);
            ansy.start(_x,_y);
        }

      });
  });

      socket.on('disconnect', function () {
         // toWall("dis_connect!");
      });

var Timer = {};
Timer.fn=function () {
    MY.b.css({ "top": MY.bObj.y + "px" });
    HE.b.css({ "top": HE.bObj.y + "px" });
    ST.nextFrame();
};
Timer.start =function(){
    Timer.id=  window.setInterval(Timer.fn, 1000 / 60);
} 
Timer.stop =function(){
    window.clearInterval(Timer.id);
}
document.addEventListener("touchmove", function (e) {
    e.preventDefault();
})