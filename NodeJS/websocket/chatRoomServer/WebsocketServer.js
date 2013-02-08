//npm install socket.io
//<script src="http://122.0.67.233:20000/socket.io/socket.io.js"></script>
// npm install -g node-inspector


// node --debug xx.js 

// node-inspector

// http://192.168.1.103:8080/debug?port=5858
var io = require('socket.io').listen(8888);
var userList=[];
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
io.sockets.on('connection', function (socket) {
  userList.push(socket);
  socket.on('message', function (event) { 
    for (var i = 0; i < userList.length; i++) {
     var innerSocket= userList[i];
     innerSocket.send(socket.id);//event
    };
  });
  socket.on('disconnect', function (event) {

   });
});




