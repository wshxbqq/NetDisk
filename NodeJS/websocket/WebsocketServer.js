//npm install socket.io


var io = require('socket.io').listen(8888);
var userList=[];
io.sockets.on('connection', function (socket) {
  userList.push(socket);
  socket.send ( 'Now connected!' );
  console.log("loged");

  socket.on('message', function (event) { 
    for (var i = 0; i < userList.length; i++) {
     var innerSocket= userList[i];
     innerSocket.send(event+"_from server");
    };
  });
  socket.on('disconnect', function (event) {
   console.log(event);
   });
   console.log("connectioned");
});
