$("#Book").live("pageshow", function () {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    var UD = tool.getUD();
    var $lis = $("li[storyid]");
    $lis.each(function (n, i) {
        var $li = $(i);
        $.each(UD.listened, function (_n, _i) {
            if ((_i + "") === $li.attr("storyid")) {
                $li.find("a").css("color", "green");
            }
        });

    });

});