$("#QuickregBtn").live(DefaultEventName, function () {

    var userName = $("#username_reg").val();
    var pwd = $("#username_pwd").val();
    var pwd1 = $("#username_pwd1").val();
    var label = $("#reg_Label");

    if (userName.length <= 5) {
        label.html("用户名不能少于5位");
    }
    else {
        if (pwd != pwd1) {
            label.html("2次输入不一致");
        } else {

            $.post("/Logic/User/userInfo.aspx?action=regist&stmp=" + Math.random(), { "username": userName, "userpwd": pwd }, function (result) {
                if (result == "false") {
                    label.html("该名已被占用");
                } else {
                    text_array = [];
                    text_array.push("欢迎您：" + userName + "<br/>");
                    text_array.push("注册成功！<br/>");
                    text_array.push("<button id=\"reg_success_button\">返回</button>");
                    var text = text_array.join('');
                    $("#RegistPageContainer").html(text);
                    $("#reg_success_button").button()
             .bind(DefaultEventName, function () {
                 PingShu.to("/Logic/Hot.aspx");
             })
                }
            });
        }


    }

});