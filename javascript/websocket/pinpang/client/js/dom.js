var dom = {};
//填充空闲玩家数组
dom.fillPlayerList = function (data) {
   $(".palyer").remove();
    for (var i in data) {
        var playerData = data[i];
        var div = document.createElement("div");
        $(div).addClass("palyer")
        .html("玩家id:"+playerData);
        $(".playerList").append(div);
    }
};

dom.changeReadyTip = function (flag) {
    var text = "连接中";
    if (flag) {
        text = "已连接";
    }
    $("#status").html(text)
}