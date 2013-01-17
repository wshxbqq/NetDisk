/// <reference path="../../Libs/JqueryMobile/jquery.mobile-1.2.0.js" />
/// <reference path="../../Libs/Jquery/jquery.js" />
/// <reference path="../Common.js" />
/// <reference path="../Day/Day.js" />

(function () {
    var c = window.Common;
    var m = window.Model;
    m.DATA = function () {
        this.type = "DATA";
        this.UUID = "";
        this.CreateTime = "";
        this.Diary = {};
    };

    m.DATA.prototype.init = function (DATA) {
        var _this = this;
        this.UUID = DATA.UUID;
        this.CreateTime = DATA.CreateTime;
        for (var n in DATA.Diary) {
            var day_data = DATA.Diary[n];
            var day = new m.Day();
            day.init(day_data);
            _this.Diary[n] = day;
        }
    };

    m.DATA.prototype.getDayListWithMonth = function (mon) {
        var month = mon || c.getTimeFormat().split("_")[1];
        var monthList = [];
        for (var i in this.Diary) {
            if (i.split("_")[2] == month) {
                var day = this.Diary[i];
                monthList.push(day.getHTML());
            }
        };
        monthList.sort(function (a, b) {
            console.log(a);
            var a_day = window.parseInt(a.match(/\d+/g)[2]);
            var b_day = window.parseInt(b.match(/\d+/g)[2]);
            return b_day-a_day;
        });
        return monthList.join('');
    }


})()