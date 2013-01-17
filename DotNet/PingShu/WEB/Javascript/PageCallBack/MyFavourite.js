$("#MyFavourite").live("pageshow", function () {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    var favString = tool.getFavourite();
    var ulContainer = $("#MyFavourite_Container ul");
    ulContainer.html("获取中。。。");
    $.post("/Logic/MyFavourite.aspx?tamp=" + Math.random(), { favourite: favString }, function (result) {
        $("#MyFavourite_Container ul").html(result);
        ulContainer.listview('refresh');
    });
    tool.setFooterActive("MyFavourite");
});