(function () {
    var P = window.Panel = function () { };
    P.loginHTML = [
    '    <div class="panelContainer">                                                              ',
    '    <div class="panelBg">                                                                     ',
    '        <div class="panelInner">                                                              ',
    '            <br />                                                                            ',
    '            <div></div>                                                                       ',
    '            <table>                                                                           ',
    '                <tr>                                                                          ',
    '                    <td class="panelTdName">昵称：</td>                                       ',
    '                    <td><input id="nickName" value="游客" /></td>                             ',
    '                                                                                              ',
    '                </tr>                                                                         ',
    '            </table>                                                                          ',
    '                                                                                              ',
    '            <br />                                                                            ',
    '            <div class="tipLogin">你还没有名字<br/>给自己起一个名字吧</div>                      ',
    '            <br />                                                                            ',
    '            <br />                                                                            ',
    '            <br />                                                                            ',
    '            <div class="submitBtnLoginDiv">                                                   ',
    '                <a class="btn_green submitBtnLogin" style="line-height:50px;" id="submitBtnLogin">确  定</a>          ',
    '            </div>                                                                            ',
    '        </div>                                                                                ',
    '    </div>                                                                                    ',
    ' </div>                                                                                       '
    ].join("");

 

    P.showLogin = function () {
        $(".panelContainer").remove();
        $("#wraper").prepend(P.loginHTML)
    }

    P.showWellcome = function (data) {
        $(".panelContainer").remove();
        var html = P.wellComeHTML.replace(/{.*?}/g, function (match) {
            switch (match) {
                case "{name}": return data.name; break;
                case "{level}": return data.level; break;
                case "{mark}": return data.mark; break;

            }
        });
        $("#wraper").prepend(html)
    }
})()