/// <reference path="Common.js" />
/// <reference path="Dic.js" />

(function () {
    window.setInterval(function () {
        var insects = $("div[word_id_ant]");
        insects.each(function (n, i) {
            var insect = i;
            var currentFrame = window.parseInt($(i).attr("frames"));
            var a_frames = window.parseInt($(i).attr("a_frames"));
            var s_height = window.parseInt($(i).attr("s_height"));
            if (currentFrame < a_frames) {
                currentFrame++;
                $(insect).css("background-position-y", ((currentFrame - 1) * s_height) + "px")
                .attr("frames", currentFrame);
            } else {
                currentFrame = 1;
                $(insect).css("background-position-y", ((currentFrame - 1) * s_height) + "px")
                .attr("frames", 1);
            }

        });
    }, 200);


})();