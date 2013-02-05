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

var userList = [];
var groupList=[];

io.sockets.on('connection', function (socket) {
    var data = getData();
    socket.send(data);
    userList.push(socket);
   
    socket.on('message', function (event) {
        socket.send(event);
      switch (event) {
          case "createGroup":
                var grp=  createGroup(socket.id, event);
                grp.a.send("left");
                grp.b.send("right");
              break;
      }
  });
  socket.on('disconnect', function (event) {

  });
});

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




function getSocketById(id) {
    var result;
    for (var i = 0; i < userList.length; i++) {
        var innerSocket = userList[i];
        if (id == innerSocket.id) {
            result = innerSocket;
        }
    };
};




