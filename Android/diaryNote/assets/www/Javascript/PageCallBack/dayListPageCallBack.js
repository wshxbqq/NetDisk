/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />

(function () {
    var c = window.Common;
    var m = window.Model;
    var MonthTemp = [
            '<div id="monthSelectorDiv" data-role="fieldcontain"   >',
			'<select name="monthSelector" id="monthSelector" data-native-menu="false">',
            '{0}',
			'</select>',
	        '  </div>'
    ].join("");

    var getMonthHtml = function () {
        var month = new Date().getMonth();
        month++;
        var insertOption = function (m) {
            var optionsHTML = "";
            for (var i = 1; i <= m; i++) {
                if (i == month) {
                    optionsHTML += '<option value="month_' + i + '" selected>' + i + '月</option>';
                } else {
                    optionsHTML += '<option value="month_' + i + '">' + i + '月</option>';
                }
            }
            return optionsHTML;
        }
        var html = MonthTemp.replace(/{\d+}/g, function (match) {
            switch (match) {
                case "{0}": return insertOption(month); break;
            }
        });

        return html;

    }

    $("#dayListPage").live("pagebeforecreate", function () {
        $("#monthSelectorContainer").html(getMonthHtml());
        $("#dayListUL").html(LIVE_DATA.getDayListWithMonth());

    })
    $("#dayListPage").live("pageshow", function () {


    })
    $("a[dayflag]").die().live(c.defaultEventName, function () {
        var dayKey = $(this).attr("dayid");
        dayKey = dayKey.replace("Diary", "Day");
        window.currentDay = LIVE_DATA.Diary[dayKey];
        c.to("storyList.html");
    });
    $("#dayListPageNewDiaryBtn").die().live(c.defaultEventName, function () {
        m.Story.addStory();
    });

    $("#monthSelectorDiv").die().live("change", function (event, ui) {
        var mon = window.parseInt($("#monthSelector-button").find(".ui-btn-text:contains(月)").text().match(/\d+/g)[0]);
        $("#dayListUL").html(LIVE_DATA.getDayListWithMonth(mon))
            .listview('refresh');

    });

    $("a[del_day_btn]").die().live(c.defaultEventName, function () {
        delete (LIVE_DATA.Diary[window.__delDayId]);
        c.toLocal();
    });

    $("a[type='day_del_list_right_btn']").die().live(c.defaultEventName, function () {
        var id = $(this).attr("del_day_id");
        window.__delDayId = id;


    });
})()