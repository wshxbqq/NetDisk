/// <reference path="Common.js" />
/// <reference path="Dic.js" />

(function () {

    var C = window.Common;
    var D = window.Dic;



    var Tip = window.Tip={};
    var Tip = window.Tip={};
    Tip.currentWordId = null;
    Tip.currentWord = null;
    Tip.changWord = function () {
        var wordObj = D.getOne();
        Tip.currentWordId = wordObj.id;
        Tip.currentWord = wordObj;
        $("#TipText").animate({ "top": "100px" }, 500, function () {
            $(this).html(wordObj.explain)
                .attr("word_id", wordObj.id);
            $(this).animate({ "top": "10px" }, 500, function () {

            });
        });
    };
    
    $(".TipContainer").bind("touchend", function () {
        Tip.changWord();
        window.Player.addMark(-2);
    });
    Tip.changWord();
})();