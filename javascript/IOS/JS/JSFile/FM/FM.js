/// <reference path="../Common/Common.js" />

(function () {
    var C = window.Common;
    var G = window.GLOBAL_CONFIG;
    var R = window.RunTime;
    var M = window.Manager;


    var Fp = window.FM_Page = function () {
        this.arrayFM = [];
        this.bodyDOM = null;
        this.bodyWalkDOM = null;


        
     
    };

    
    Fp.prototype.init = function (icoConfig) {
        
    };





    Fp.prototype.show = function () {
 
        var data = R.currentPlayer;
        var pageHTML = this.TemFMPage;
        pageHTML = pageHTML.replace(/{.*?}/g, function (m) {
            switch (m) {
              

            }
        });

        $(wraper).append(pageHTML);
        var listDIV = $(".FM_list");

    
        for(var i in  data.FM){
            var fm = data.FM[i];
            var flag = false;
            for (var j in this.arrayFM) {
                var fmInner = this.arrayFM[j];
                if (fmInner.fm.id === fm.id) {
                    fmInner.count++;
                    flag = true;
                }
            }
            if (!flag) {
                var obj = {};
                obj.fm = fm;
                obj.count = 1;
                this.arrayFM.push(obj);
            }
        }



        var fmHTML = [];
        for (var k in this.arrayFM) {
            var fmObj = this.arrayFM[k];
            var html = this.getFM_HTML(fmObj);
            fmHTML.push(html);
        };

        listDIV.append(fmHTML.join(''));
      
    };

    Fp.prototype.getFM_HTML = function (obj) {//count FM的数量
        var fm_tem = this.TemFM;
        console.log(obj);
        var html = fm_tem.replace(/{.*?}/g, function (m) {
            switch (m) {
                case "{FM_img_ico}": return obj.fm.ico; break;
                case "{FM_name}": return obj.fm.name; break;
                case "{FM_txt}": return obj.fm.text; break;
                case "{FM_count}": return obj.count; break;

            }
        });

        return html;
    };


    Fp.prototype.TemFMPage = [
      ' <div class="FM_container">                                      ',
       '     <div class="Mingwen_text"><img src="R/Img/Other/mingwen.png"></div>                                 ',
      '     <div class="FM_list"></div>                                 ',
      '     <div class="btn btnBack">返回</div> <div class="btn btnShop">拍卖行</div>',
      '   </div>                                                        '
    ].join("");


    Fp.prototype.TemFM = [
      '  <div class="FM">  ',
      '              <img class="FM_ico" src="{FM_img_ico}" />  ',
      '              <div class="FM_name">{FM_name}</div>  ',
      '              <div class="FM_txt">{FM_txt}</div>  ',
      '              <div class="FM_count">{FM_count}次</div>  ',
      '          </div>  '
    ].join("");

})()