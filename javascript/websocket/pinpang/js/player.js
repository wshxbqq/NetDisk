
var ansy = {};
ansy.who = function (position) {
    $(".animation").removeClass("animation");
        if (position == "left") {
            MY.b = b1;
            MY.bObj=b1Obj;
            MY.p = "left";

            HE.b = b2;
            HE.bObj=b2Obj;
            HE.p = "right";
        } else {
            MY.b = b2;
            MY.bObj=b2Obj;
            MY.p = "right";

            HE.b = b1;
            HE.bObj=b1Obj;
            HE.p = "left";
        }

        $(HE.b).addClass("animation");
    };


    ansy.showLogin = function () {
        $(".login").show();
    }
    ansy.start = function (x,y) {
        $(".login").hide();
        ballObj._x = 0;
        ballObj._y = 0;

        window.setTimeout(function () {
            ballObj._x = x;
            ballObj._y = y;
        },2000);
    };

    ansy.win = function () {
        var result = 1;
        if (ballObj.x < 0 && MY.p == "left") {
            result = 0;
        };
        if (ballObj.x > 960 && MY.p == "right") {
            result = 0;
        };
        if (!result) {
            ansy.stop();
        }
        return result;
    };

    ansy.newGame = function () {
        window.socket.emit("newGame");
    };

    ansy.updateB = function () {
        window.socket.emit("updateB", { "data": MY.bObj.y });
    };

    ansy.stop = function () {
        ballObj.x = 460;
        ballObj.y = 300;
        ballObj._y = 0;
        ballObj._x = 0;
    };

    ansy.setBall = function () {
        ball.css({"top":ballObj.y+"px","left":ballObj.x+"px"});
    };

    ansy.showText = function (who,text) {
        var d = document.createElement("div");
        textContainer.append(d);
        $(d).addClass("text")
        .html(who + "说：" + text)
        .animate({ "left": "1000px" }, 5000, function () {
            $(this).remove();
        });
    };

    ansy.showServerText = function (text) {
        var d = document.createElement("div");
        textContainer.append(d);
        $(d).addClass("text")
        .html("服务器广播：" + text)
        .css("color","red")
        .animate({ "left": "1000px" }, 5000, function () {
            $(this).remove();
        });
    };

    ansy.move = function (e) {
        var x = e.clientX || e.originalEvent.touches[0].clientX;
        var y = e.clientY || e.originalEvent.touches[0].clientY;
        if (y > 0 && y < 540) {
            MY.bObj.y = y;
        }
    };

    ansy.playerList = function (e) {
        var div = e.target;
        if (!$(div).hasClass("palyer")) {
            return;
        }
        var id = div.innerHTML.split(":")[1];
        ansy.openRoomWith(id);
    };

    ansy.openRoomWith = function (socketId) {
        window.socket.emit("createRoom", { "data": socketId });
    };

    ansy.changeBall = function () {
        window.socket.emit("ballChange", ballObj);
    };

    ansy.listen = function () {
        bg.bind("mousemove touchmove", ansy.move);
        $(".playerList").bind("click", ansy.playerList);
    };



    ansy.exit = function () {
        $(".jalert").show();
    };

    ansy.listen();