function initPlayerUI($slider) {
    var player = window.songPlayer;
    var slider = $slider;
    var flagTouching = false;
    $(slider).on('slidestop', function (event) {
        flagTouching = false;
        var percent = $(event.target).val();
        percent = window.parseInt(percent);
        var playedTime = songPlayer.getCurrentPosition();
        var totalTime = songPlayer.getTotalTime();
        if (playedTime === 0 || totalTime === 0) {

        } else {
            var toTime = totalTime * percent / 100;
            songPlayer.setCurrentPosition(toTime);
            player.play();
        }


    }
    );

    $(slider).on('slidestart', function (event) {
        flagTouching = true;
    }
    );

    window.UIinterval = window.setInterval(function () {
        if (flagTouching) {
            return;
        }
        if (!songPlayer) {
            window.clearInterval(window.UIinterval);
        }
        var playedTime = songPlayer.getCurrentPosition();
        var totalTime = songPlayer.getTotalTime();
        var percent = window.parseInt(playedTime / totalTime * 100);
        $(slider).val(percent);
        slider.slider('refresh');
    }, 1000);

 }