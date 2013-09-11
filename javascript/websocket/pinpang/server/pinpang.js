//npm install socket.io
//<script src="http://122.0.67.233:20000/socket.io/socket.io.js"></script>

// npm install -g node-inspector
// node --debug xx.js 
// node-inspector
// http://192.168.1.103:8080/debug?port=5858



var io = require('socket.io').listen(8888);
var SocketHelper = require('./js/SocketHelper');
//development
io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging

// enable all transports (optional if you want flashsocket support, please note that some hosting
// providers do not allow you to create servers that listen on a port different than 80 or their
// default port)
io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

var roomList=[];

io.sockets.on('connection', function (socket) {
    socket.join("free");
    socket.roomID = "free";
    socket.on('message', function (event) {

    });

    socket.on('createRoom', function (data) {
        var remoteSocket = getSocketById(data.data);
        var roomID = createRom(socket, remoteSocket);
        var room = getSocketFromRoomId(roomID);
        
        for (var i in room) {
            var s = room[i];
            s.emit("start", { "data": s.p });
        };

        updateFreelayer();
        
    });


    socket.on('updateB', function (data) {
        var room = getSocketFromRoomId(socket.roomID);
        
        for(var i in room){
            var s = room[i];
            if (s.id != socket.id) {
                s.emit("updateB", { "data": data.data});
            }
        }
    });


    socket.on('ballChange', function (data) {
        var room = getSocketFromRoomId(socket.roomID);
        io.sockets.in(socket.roomID).emit('ballChange', { x: data.x, y: data.y, _x: data._x, _y: data._y, });
    });


    socket.on('newGame', function (data) {
        var room = getSocketFromRoomId(socket.roomID);
        io.sockets.in(socket.roomID).emit('newGame', { x: 460, y: 300, _x: -Math.random()-10, _y: Math.random()*4 });
    });



    socket.on('updateFreelayer', function () {
        updateFreelayer();
    });




    socket.on('disconnect', function (event) {
       
        var room = getSocketFromRoomId(socket.roomID);
        for (var i in room) {
            var s = room[i];
            if (s.id != socket.id) {
                switchRoom(s, "free");
                s.emit("enemyDie", {});
            }
        };


        socket.leave("free");
        updateFreelayer();
      });
});


function switchRoom(socket,room) {
    if (socket.roomID) {
        socket.leave(socket.roomID);
        socket.join(room);
        socket.roomID = room;
    }
}


//刷新 所有玩家的  空闲玩家列表
function updateFreelayer() {
    var freeSockets = getSocketFromRoomId("free");
    for (var i in freeSockets) {

        var currentSocket = freeSockets[i];
        var currentArray = [];
        var currenResult = { "data": currentArray };

        for (var j in freeSockets) {
            if (currentSocket.id != freeSockets[j].id) {
                currentArray.push(freeSockets[j].id);
            };
        };
        currentSocket.emit("updateFreelayer", currenResult);
    };
};


function createRom(socket1, socket2) {
    var roomID = "room_" + Math.random();
    socket1.roomID = roomID;
    socket2.roomID = roomID;
    socket1.p = "left";
    socket2.p = "right";

    socket1.join(roomID);
    socket2.join(roomID);
    socket1.leave("free");
    socket2.leave("free");
    return roomID;
}




function getSocketFromRoomId(roomId) {
    return io.sockets.clients(roomId)
};

function getSocketById(Id) {
    var result;
    for (var i in io.sockets.sockets) {
        if (i == Id) {
            result = io.sockets.sockets[i]
        }
    }
    return result;
};


function getData() {
    var unGroup = getUnGroupPlayer();
    var obj = { "type": "init", "data": unGroup };
    return JSON.stringify(obj);
}

function getUnGroupPlayer() {
    var list = [];
    for (var i = 0; i < userList.length; i++) {
        var innerSocket = userList[i];
        if (!innerSocket.inGroup) {
            var o = {};
            o.id = innerSocket.id;
            list.push(o);
        }
    };
    return list;
}
function createGroup(id1, id2) {
    var result;
    var gObj = {};
    var s1 = getSocketById(id1);
    var s2 = getSocketById(id2);
    if (s1 && s2) {
        result = true;
        gObj.a = s1;
        gObj.b = s2;
        gObj.a.HE = gObj.b;
        gObj.b.HE = gObj.a;
        gObj.a.inGroup = true;
        gObj.b.inGroup = true;
        result = gObj;
        groupList.push(gObj);
    };
    return result;
}







