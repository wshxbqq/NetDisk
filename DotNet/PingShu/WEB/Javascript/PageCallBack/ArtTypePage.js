
$("#ArtTypePage").live("pageshow", function (obj) {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    tool.setFooterActive("ArtType");
})