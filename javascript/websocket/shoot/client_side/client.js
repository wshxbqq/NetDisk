function socket_client(){
    var SERVER = "169.254.83.221:8888";
    window.socket = io.connect(SERVER);

    socket.on('connect', function (connectMsg) {
       
        socket.on('say_hello_to_new_commer', function (data) {
            markPanel.addText(data.text, "green")
        });

        socket.on('update_position', function (data) {
            updateEnemy(data);
        
        });

        socket.on('update_bulet', function (data) {
            updateBulet(data);

        });

        socket.on('add_kill_count', function (data) {
            window.PLAYER.kill++;

        });
        socket.on('kill_txt', function (data) {
            markPanel.addText(data.text, "red")

        });
        socket.on('disconnect', function (data) {
            $("#" + data.id).remove();
           
        });

        socket.on('leave', function (data) {
            markPanel.addText(data.leave+"离开了游戏。", "green")
        });


        
    })
}

