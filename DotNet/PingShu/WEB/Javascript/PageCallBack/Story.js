$("#Story").live("pageshow", function (obj) {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    var reg = /\d+/gi;
    var baseURI = obj.currentTarget.baseURI || "1=1";
    var storyID = baseURI.split("=")[1];
    tool.getUD();
    var flag = false;
    $.each(window.UD, function (n, i) {
        if (i === storyID) {
            falg = true;
        }
    });
    if (!flag) {
        window.UD.listened.push(storyID);
        tool.setUD();
    }



    var songList = JSON.parse($("#hide_array_input").val());
    var index = $("#hide_array_index").val();
    if (window.songPlayer) {
        window.songPlayer.dispose();
    }
    window.songPlayer = new window.Player(songList);
    window.songPlayer.playIndex = window.parseInt(index);
    window.songPlayer.init();
    window.songPlayer.load();
    window.songPlayer.play();


    initPlayerUI($("#player_slider"));

    $(".playSong").bind("tap", function () {
        var player = window.songPlayer;
        if (player.status === "play") {
            player.pause();
        } else {
            player.play();
        }

    });

    $(".rightSong").bind("tap", function () {
        var player = window.songPlayer;
        player.nextSong();
    });


    $(".leftSong").bind("tap", function () {
        var player = window.songPlayer;
        player.preSong();
    });

    //---clickTip
    var removeTimeOut = window.removeTimeOut;
    var timeOut = window.timeOut = window.setTimeout(function () {
        var clickTip = $("#clickTip");
        var footHeight = $("#story_footer").height();
        clickTip.css("display", "block");
        clickTip.animate({
            "bottom": (footHeight + 60) + "px"
        }, 500, function () {
            clickTip.animate({ "bottom": (footHeight + 10) + "px" }, 500, function () {
                removeTimeOut = window.setTimeout(function () {
                    clickTip.animate({ "opacity": "0" }, 1500, function () {
                        clickTip.remove();
                    });
                }, 2000);
            });

        });

    }, 500);


    var storyId = $("#story_id_hidden_val").val();
    window.tool.DC(storyId);


    //---XiaoHua
    window.tool.showXiaoHua();
});

$("#Story").live("pagehide", function () {
    window.clearTimeout(window.removeTimeOut);
    window.clearTimeout(window.timeOut);
    $("#clickTip").remove();
});

$("#XiaoHuaContainer").live("tap", function () {
    window.tool.showXiaoHua();
    $.mobile.silentScroll();
});