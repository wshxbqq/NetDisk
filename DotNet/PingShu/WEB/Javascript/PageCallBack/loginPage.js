
$("#loginPage").live("pageshow", function (obj) {

    tool.setFooterActive("Login");
})

//--------------------------------------------------------------

$("#loginBtn").live(DefaultEventName, function () {
    var name = $("#username").val();
    var pwd = $("#userpwd").val();
    var favString = tool.getFavourite();
    if (name.length < 5) {
        $("#login_label").html("请输入正确的用户名");
        return;
    }
    $.post("/Logic/User/userInfo.aspx?action=login&stmp=" + Math.random(), { "username": name, "userpwd": pwd, "favString": favString }, function (result) {
        if (result != "false") {
            tool.setFavourite(result);
            var text_array = [];
            text_array.push("欢迎您：" + name + "<br/>");
            text_array.push("收藏夹已同步成功！<br/>");
            text_array.push("<button id=\"log_success_button\">返回</button>");
            var text = text_array.join('');
            $("#loginPageContainer").html(text);
            $("#log_success_button").button()
            .bind(DefaultEventName, function () {
                PingShu.to("/Logic/MyFavourite.aspx");
            })
        }
        else {
            $("#login_label").html("用户或密码错误");
        }
    })
});


//--------------------------------------------------------------


$("#regBtn").live(DefaultEventName, function () {
    PingShu.to("/Logic/Regist.aspx");
});


//--------------------------------------------------------------


$("#logout_button").live(DefaultEventName, function () {
    $.post("/Logic/User/userInfo.aspx?action=logout&stmp=" + Math.random(), {}, function (result) {
        if (result === "true") {
            text_array = [];
            text_array.push("已登出！<br/>");
            text_array.push("<button id=\"logout_success_button\">返回</button>");
            var text = text_array.join('');
            $("#loginPageContainer").html(text);
            $("#logout_success_button").button()
                 .bind(DefaultEventName, function () {
                     PingShu.to("/Logic/Hot.aspx");
                 })
        }
    });

});