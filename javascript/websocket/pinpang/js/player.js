
var ansy = {};
    ansy.who = function (position) {
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
    };

    ansy.start = function (x,y) {

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

        mark_he++;

        //send();
        
        return result;
    };
    ansy.stop = function () {
        ballObj.x = 460;
        ballObj.y = 300;
        ballObj._y = 0;
        ballObj._x = 0;
    }
    ansy.setBall = function () {
        ball.css({"top":ballObj.y+"px","left":ballObj.x+"px"});
    };

    ansy.showText = function (who,text) {
        var d = document.createElement("div");
        textContainer.append(d);
        $(d).addClass("text")
        .html(who + "˵��" + text)
        .animate({ "left": "1000px" }, 5000, function () {
            $(this).remove();
        });
    };

    ansy.showServerText = function (text) {
        var d = document.createElement("div");
        textContainer.append(d);
        $(d).addClass("text")
        .html("�������㲥��" + text)
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

    ansy.listen = function () {
        bg.bind("mousemove touchmove", ansy.move);
    };

    ansy.exit = function () {
        $(".jalert").show();
    };

    ansy.who("right");
    ansy.listen();