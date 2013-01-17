$("#HotPage").live("pageshow", function () {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    var $li_s = $("#HotPage_Container ul li");
    $li_s.each(function (n, i) {
        var bookid = $(i).find("a[datafor='addFavourite']").attr("bookid");
        if (tool.checkBookIdInFavourite(bookid)) {
            tool.setLiFavoutiteRender($(i));
        }
    });
    tool.setFooterActive("Hot");
});