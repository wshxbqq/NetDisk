//sudo python -m SimpleHTTPServer 80
//npm install –g node-inspector 
//node --debug-brk server.js 

var io = require('socket.io').listen(8888);
 
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

var socketArray = [];

io.sockets.on('connection', function (socket) {

    console.log(socket.id);

    socket.join("free");
    socket.roomID = "free";
    socketArray.push(socket);

    socket.on('i_am_come_in', function (data) {
        socket.playerName = data.name;
        io.sockets.emit('say_hello_to_new_commer', { "text": data.name + " 加入了我们! " });
    });

    socket.on('update_position', function (data) {
        data.id = socket.id;
        socket.broadcast.emit('update_position', data);
    });

    socket.on('update_bulet', function (data) {
        data.id = socket.id;
        socket.broadcast.emit('update_bulet', data);
    });

    socket.on('add_kill_count', function (data) {
        var id = data.p_id;
        io.sockets.sockets[id].emit("add_kill_count", { "mark": 1 });
        io.sockets.emit('kill_txt', { "text": io.sockets.sockets[id].playerName + " 干掉了 " + socket.playerName });

        
    });

    socket.on('disconnect', function (event) {
        socket.leave("free");
        socket.broadcast.emit('disconnect', { "id": socket.id });
        socket.broadcast.emit('leave', { "leave": socket.playerName });






    });




})
