/// <reference path="underscore-min.js" />




window.SPEED = 10;

var markPanel = $(".mark_layer")
markPanel.addText = function (text,color) {
    var p = document.createElement("p");
    $(p).html(text).css("color", color)

    markPanel.prepend(p);

}

$("#player_name_btn").click(function () {
    if ($("#player_name").val()) {
        window.PLAYER = {};
        window.PLAYER.position = {};
        window.PLAYER.name = $("#player_name").val();
        window.PLAYER.deadCount = 0;
        window.PLAYER.kill = 0;
        socket_client();
        $(".login").remove();
        window.setInterval(function () {
            $("#kill_count").html(window.PLAYER.kill);
            $("#die_count").html(window.PLAYER.deadCount);
        }, 100);
        initPlayer();
        socket.emit("i_am_come_in", { "name": window.PLAYER.name });
    } else {
        alert("请填写用户名");
    }

});


function down(e) {
    var e=e||event;
    var ck = e.keyCode;
    switch (ck) {
        case 87: window.PLAYER.up = 1;; break;
        case 65: window.PLAYER.left = 1;; break;
        case 83: window.PLAYER.down = 1;; break;
        case 68: window.PLAYER.right = 1;; break;
    }
}
function up(e) {
    var e = e || event;
    var ck = e.keyCode;
    switch (ck) {
        case 87: window.PLAYER.up =0;; break;
        case 65: window.PLAYER.left = 0;; break;
        case 83: window.PLAYER.down = 0;; break;
        case 68: window.PLAYER.right = 0;; break;
    }

}
function initPlayer() {
    window.PLAYER.dom = document.createElement("div");
    window.PLAYER.dom.innerHTML = window.PLAYER.name;
    window.PLAYER.dom.className = "player";
    $(".rect").append(window.PLAYER.dom);
    document.onkeydown = down;
    document.onkeyup = up;
    window.PLAYER.bulet = [];
    window.PLAYER.position.left = 0;
    window.PLAYER.position.top = 0;
    window.setInterval(function () {
        if (window.PLAYER.up && window.PLAYER.position.top > 0) {
            window.PLAYER.position.top -= 3;
        }

        if (window.PLAYER.left && window.PLAYER.position.left > 0) {
            window.PLAYER.position.left -= 3;
        }

        if (window.PLAYER.down && window.PLAYER.position.top < 640) {
            window.PLAYER.position.top += 3;
           
        }

        if (window.PLAYER.right && window.PLAYER.position.left < 960) {
            window.PLAYER.position.left += 3;
      
        }
        window.PLAYER.dom.style.top = window.PLAYER.position.top + "px";
        window.PLAYER.dom.style.left = window.PLAYER.position.left + "px";

    }, 10);


    window.setInterval(function () {
        socket.emit("update_position", { "top": window.PLAYER.position.top, "left": window.PLAYER.position.left });
        var array = [];
        _.each(window.PLAYER.bulet, function (e) {
            var o = {};
            o.p_id = e.p_id;
            o.b_id = e.b_id;
            o.top = e.position.top;
            o.left = e.position.left;
            array.push(o);
        });
        socket.emit("update_bulet", array);


    }, 10);
    var interval = window.setInterval(function () {
       
       

        _.each(window.PLAYER.bulet, function (obj) {
            if (obj.position.top < 0 || obj.position.top > 640 || obj.position.left < 0 || obj.position.left > 960) {
                $(obj.dom).remove();
                obj.remove = 1;
                
            }

            obj.position.top += obj.s_x;
            obj.position.left += obj.s_y;

            $(obj.dom).css({ "top": obj.position.top + 20 + "px", "left": obj.position.left + 20 + "px" });

        });
        window.PLAYER.bulet = _.reject(window.PLAYER.bulet, function (e) {
            return e.remove == 1;
        });
        

    }, 10);
}



function updateEnemy(data) {
    var dom = $("#" + data.id);
    if (dom.size()) {
        dom.css({ "left": data.left + "px", "top": data.top + "px" });
    } else {
        dom = document.createElement("div");
        $(dom).attr({ "id": data.id, "class": "player", "p_id": data.p_id })
        .css({ "left": data.left + "px", "top": data.top + "px" });
        $(".rect").append(dom);
    }

}
function updateBulet(_data) {
    _.each(_data, function (data) {
        var dom = $("#" + data.b_id);


        if (dom.size()) {
            dom.css({ "left": data.left + "px", "top": data.top + "px" });
        } else {
            dom = document.createElement("div");
            $(dom).attr({ "id": data.b_id, "class": "bulet1", "p_id": data.p_id })
            .css({ "left": data.left + "px", "top": data.top + "px" });
            $(".rect").append(dom);
        }
    });



}

$(".rect").bind("click", function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var angel = Math.atan2((y - window.PLAYER.position.top), (x - window.PLAYER.position.left));
    var s_x = window.SPEED * Math.sin(angel);
    var s_y = window.SPEED * Math.cos(angel);


    var bullet = {};
    bullet.p_id = socket.socket.sessionid;
    bullet.b_id = "b_"+ parseInt(Math.random()*1000);
    bullet.dom = document.createElement("div");
    bullet.dom.className = "bulet";
    bullet.position = {
        top: window.PLAYER.position.top,
        left: window.PLAYER.position.left
    };

    bullet.s_x = s_x;
    bullet.s_y = s_y;
    $(bullet.dom).css({ "top": window.PLAYER.position.top + 20 + "px", "left": window.PLAYER.position.left + 20 + "px" }).attr("p_id", bullet.p_id);
    $(".rect").append(bullet.dom);
    window.PLAYER.bulet.push(bullet);

});


window.setInterval(function () {
    var bs = $(".bulet1");
    bs.each(function (n, i) {
        var left = window.parseInt($(i).css("left"));
        var top = window.parseInt($(i).css("top"));
        if (top < 10 || top > 630 || left < 10 || left > 950) {
            $(i).remove();

        }
    });
}, 100);

function testHit(point,point1) {
    var result = false;
    if (point.top < point1.top + 50 && point.top > point1.top && point.left < point1.left + 50 && point.left > point1.left) {
        result = true;
    }
    return result;
}

window.setInterval(function () {
    var bs = $(".bulet1");
    bs.each(function (n, i) {
        var left = window.parseInt($(i).css("left"));
        var top = window.parseInt($(i).css("top"));
        var o = { "top": top, "left": left }
        var r = testHit(o,window.PLAYER.position);
        if(r){
            die();
            socket.emit("add_kill_count", { "p_id": $(i).attr("p_id") });
      
            $(i).remove();
            







        }
    });
}, 10);

function die() {
    window.PLAYER.deadCount++;
    window.PLAYER.position.top = Math.random() * 640;
    window.PLAYER.position.left = Math.random() * 960;
    

}