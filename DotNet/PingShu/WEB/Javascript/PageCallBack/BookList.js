(function () {
    $("#BookList").live("pageshow", function () {
        $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
        $("[data-role=header]").fixedtoolbar({ tapToggle: false });
        var maskHTML = '<div class="mask" id="loading" style="top: 0px;vertical-align: middle;"><div>读取下一页..</div></div>';

        var preLoadingShow = function () {
            $("#BookList").append(maskHTML);
        }
        var nextLoadingShow = function () {
            $("#BookList").append(maskHTML);
        }

        var loadingRemove = function () {

            $(".mask").remove();
        }

        var ajaxStart = function () {
            ajaxPageFlag = true;
            $(document).bind("touchmove", stopMove);
        }

        var ajaxEnd = function () {
            ajaxPageFlag = false;
            $(document).unbind("touchmove", stopMove);
            $(".mask").remove();
        }

        var stopMove = function (e) {

            e.preventDefault();
        }
        var ajaxPageFlag = false;
        var $_hiddenIndex = $("#BookList_Input_Hidden_PageIndex");
        var $_hiddenCount = $("#BookList_Input_Hidden_PageCount");
        var $_artist = $("#BookList_Input_Hidden_Artist");
        var $ULlist = $("#listViewBookList");
        var pageIndex = window.parseInt($_hiddenIndex.val());
        var pageCount = window.parseInt($_hiddenCount.val());
        var artistId = window.parseInt($_artist.val());

        var renderFavoutite = function () {
            var $li_s = $("#BookList_Container ul li");
            $li_s.each(function (n, i) {
                var bookid = $(i).find("a[datafor='addFavourite']").attr("bookid");
                if (tool.checkBookIdInFavourite(bookid)) {
                    tool.setLiFavoutiteRender($(i));
                }
            });
        }
        $(document).unbind("scrollstop");
        $(document).bind("scrollstop", function (e) {
            if (ajaxPageFlag) {
                return;
            }
            var top = window.pageYOffset;
            var screenHeight = window.innerHeight;
            var pageHeight = document.body.scrollHeight;

            //            if (top === 0) {
            //                if (pageIndex > 1) {
            //                    preLoadingShow();
            //                    ajaxPageFlag = true;
            //                    $.get("/Logic/BookList.aspx", { "ArtistID": artistId, "page": (pageIndex - 1) }, function (html) {
            //                        pageIndex--;
            //                        loadingRemove();
            //                        ajaxPageFlag = false;
            //                        $ULlist.html(html);
            //                        $ULlist.listview('refresh');
            //                        document.body.scrollTop = screenHeight / 2;
            //                        renderFavoutite();
            //                    });
            //                }
            //            }


            if ((top + screenHeight + 300) >= pageHeight) {
                if (pageIndex < pageCount) {
                    nextLoadingShow();
                    ajaxStart();
                    $.get("/Logic/BookList.aspx", { "ArtistID": artistId, "page": (pageIndex + 1) }, function (html) {
                        pageIndex++;
                        loadingRemove();
                        ajaxEnd();
                        $ULlist.append(html);
                        $ULlist.listview('refresh');
                        renderFavoutite();
                    });
                }
            }
        });

        //  pagehide
        $("#BookList").live("pagehide", function () {
            $(document).unbind("scrollstop");
            ajaxEnd();
        })
    });


})()

