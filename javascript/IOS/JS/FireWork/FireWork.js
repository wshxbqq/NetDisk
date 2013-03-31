/// <reference path="../Common/Common.js" />



(function () {
    var img = new Image();
    img.src = "R/Img/Other/fire.png";
    
    window.tool =
    {
        random: function (x, y, isInt) {
            var temp = Math.random() * (y - x) + x;

            if (isInt) {
                return parseInt(temp);
            }
            else {
                return temp;
            }
        },

        hitTestObject: function (objB, objA) {

            var minx = objB.loc.x > objA.loc.x ? objB.loc.x : objA.loc.x;
            var maxx = objB.loc.x + objB.width < objA.loc.x + objA.width ? objB.loc.x + objB.width : objA.loc.x + objA.width;
            var miny = objB.loc.y > objA.loc.y ? objB.loc.y : objA.loc.y;
            var maxy = objB.loc.y + objB.width < objA.loc.y + objA.width ? objB.loc.y + objB.width : objA.loc.y + objA.width;

            if (minx <= maxx && miny <= maxy) { return true; }
            else { return false; }
        }
    }

    function Bomb(x, y, type) {
        this.time = 0;
        this.frame = 0;
        this.type = type;
        this.loc = new Vector(x, y);
        this.v = new Vector(0, tool.random(0, 3));
        this.v.setAngle(tool.random(0, 6.28));
        this.g = this.v.getClone(1);
        this.g.setLength(tool.random(.1, .7));
        this.ang = this.v.getAngle() + Math.PI / 2;
        this.isDie = false
    }

    Bomb.prototype.update = function () {
        this.time++;
        this.loc.plus(this.v);
        this.v.plus(this.g);
        this.frame = parseInt(this.time / 4);
        if (this.loc.x > 1000 || this.loc.y > 1000 || this.loc.x < 0 || this.frame > 10) {
            this.isDie = true
        }
    };

    Bomb.prototype.draw = function () {
        
        g.save();
        g.translate(this.loc.x + 10, this.loc.y + 10);
        g.rotate(this.ang);
        g.drawImage(img, this.frame * 20, this.type * 20, 20, 20, -10, -10, 20 + this.frame * 2, 20 + this.frame * 2);
        g.restore()
    };

    function Vector(xx, yy) {
        this.x = xx;
        this.y = yy;
    }


    Vector.prototype.reset = function (xx, yy) {
        this.x = xx;
        this.y = yy;
    }
    //	----------------getClone----------------------------------------------

    Vector.prototype.getClone = function () {
        return new Vector(this.x, this.y);
    }
    //	----------------equals------------------------------------------------

    Vector.prototype.equals = function (v) {
        return (this.x == v.x && this.y == v.y);
    }
    //	----------------plus--------------------------------------------------

    Vector.prototype.plus = function (v) {
        this.x += v.x;
        this.y += v.y;
    }
    //	----------------plusNew-----------------------------------------------

    Vector.prototype.plusNew = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    //	----------------minus-------------------------------------------------

    Vector.prototype.minus = function (v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    //	----------------minusNew----------------------------------------------

    Vector.prototype.minusNew = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    //	----------------negate------------------------------------------------

    Vector.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
    }
    //	----------------negateNew---------------------------------------------

    Vector.prototype.negateNew = function () {
        return new Vector(-this.x, -this.y);
    }
    //	----------------scale-------------------------------------------------

    Vector.prototype.scale = function (s) {
        this.x *= s;
        this.y *= s;
    }
    //	----------------scaleNew----------------------------------------------

    Vector.prototype.scaleNew = function (s) {
        return new Vector(this.x * s, this.y * s);
    }
    //	----------------getLength---------------------------------------------

    Vector.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    //	----------------setLength---------------------------------------------	

    Vector.prototype.setLength = function (len) {
        var r = this.getLength();
        if (r) this.scale(len / r);
        else this.x = len;
    }
    //	----------------getAngle----------------------------------------------

    Vector.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    }
    //	----------------setAngle----------------------------------------------

    Vector.prototype.setAngle = function (ang) {
        var r = this.getLength();
        this.x = r * Math.cos(ang);
        this.y = r * Math.sin(ang);
    }
    //	----------------rotate------------------------------------------------

    Vector.prototype.rotate = function (ang) {
        var ca = Math.cos(ang);
        var sa = Math.sin(ang);
        var rx = this.x * ca - this.y * sa;
        var ry = this.x * sa + this.y * ca;
        this.x = rx;
        this.y = ry;
    }
    //	----------------rotateNew---------------------------------------------

    Vector.prototype.rotateNew = function (ang) {
        var v = new Vector(this.x, this.y);
        v.rotate(ang);
        return v;
    }
    //	----------------dot---------------------------------------------------

    Vector.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    }
    //	----------------getNormal---------------------------------------------

    Vector.prototype.getNormal = function () {
        return new Vector(-this.y, this.x);
    }
    //	----------------isPerpTo----------------------------------------------

    Vector.prototype.isPerpTo = function (v) {
        return (this.dot(v) == 0);
    }
    //	----------------angleBetween------------------------------------------

    Vector.prototype.angleBetween = function (v) {
        var dp = this.dot(v);
        var cosAngle = dp / (this.getLength() * v.getLength());
        return Math.acos(cosAngle);
    };




    var C = window.Common;
    var R = window.RunTime;
    var fps = 30;
    var time = 0;
    var key = {};
    var enemys, bombs, bullets, objs;
    var myCanvas = R.myCanvas = C.createDom("canvas", { "width": "650", "height": "600", "class": "canvasFireWork" }, {});
    var g = myCanvas.getContext("2d");
    g.globalAlpha = 0.6;
    g.fillStyle = '#000';
    g.fillRect(0, 0, 640, 557);

    var fpsTime, nowFps;
    var enemyTime = 10;
    var gameStart = false;
    addFire = function (x, y) {
        var fire = new Fire(x + 22, y + 50);
        bombs.push(fire);
    }

    updateObjs = function () {
        var i, j, obj;
        for (i = 0; i < 3; i++) {
            obj = objs[i];
            for (j = 0; j < obj.length; j++) {
                obj[j].update();
                if (obj[j].isDie) {
                    obj[j] = null;
                    obj.splice(j, 1);
                    j--;
                }
            }

        }
    }

    drawObjs = function () {
        g.clearRect(0, 0, 1000, 1000);
        var i, j, obj;
        for (i = 0; i < 3; i++) {
            obj = objs[i];
            for (j = 0; j < obj.length; j++) {
                obj[j].draw()
            }

        }
    }

    function init() {
        time = 0;
        key = {};
        enemys = [];
        bombs = [];
        bullets = [];
        objs = [enemys, bombs, bullets];
        fpsTime = +new Date()
    }

    var gameStart =
    {
        time: 0,
        type: 0,
        addBombs: function (XX, YY) {
            var bomb, x, y, type;
            var type = tool.random(1, 7, true);

            x = tool.random(80, 420);
            y = tool.random(80, 420);


            for (var i = 0 ; i < 30; i++) {
                bomb = new Bomb(XX, YY, type);
                bombs.push(bomb);
            }
        },

        update: function () {
            this.time++;
            if (this.time % 5 == 0) {
                if (this.time % 200 == 0) {
                    this.type++;
                    if (this.type > 6) this.type = 0;
                }
                this.addBombs();
            }
        }
    }
    R.fireWork = gameStart;
    init();
   // setInterval("drawObjs()", 1000 / 24);
   // setInterval("updateObjs()", 1000 / fps);

    //myCanvas.addEventListener("touchend", function (e) {
    //    var x = e.changedTouches[0].clientX;
    //    var y = e.changedTouches[0].clientY;
    //    gameStart.addBombs(x, y);
    //});


})()