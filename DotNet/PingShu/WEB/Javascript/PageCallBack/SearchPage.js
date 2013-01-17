PingShu.search = {};
$("#SearchPage").live("pageshow", function (obj) {
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    if (PingShu.search.value) {
        $("#search").val(PingShu.search.value);
    }
    var $li_s = $("#SearchPage_Container ul li");
    $li_s.each(function (n, i) {
        var bookid = $(i).find("a[datafor='addFavourite']").attr("bookid");
        if (tool.checkBookIdInFavourite(bookid)) {
            tool.setLiFavoutiteRender($(i));
        }
    });
    tool.setFooterActive("Search");
})


$("#searchBtn").live(DefaultEventName, function () {
    var searchText = $("#search").val();
    var q = encodeURI(searchText);
    PingShu.search.value = searchText;
    PingShu.to("/Logic/Search.aspx?q=" + q);
});