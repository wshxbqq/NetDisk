/// <reference path="../Libs/Jquery.js" />
/// <reference path="../Libs/jquery.mobile.custom.js" />
window.CDtime = 0.03;
window.shakeing = true;
(function () {
    var c = window.Common = {}
    c.disableTouchmove = function () {
        $(document).bind("touchmove", function (e) {
            e.preventDefault();

        });
    };

    c.diaableIco = function () {
        if (window.icoDisableIco) {
            return;
        }
        window.icoDisableIco = true;
        var angel = 0;
        var canvas = document.createElement("canvas");
        $(canvas).attr({ "width": "130", "height": "130" })
        .css({ "opacity": "0.5", "position": "absolute", "z-index": "10" });
        var drawCircle = function (angel, ctx) {
            ctx.clearRect(0, 0, 130, 130);
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(65, 65);
            ctx.arc(65, 65, 65, 0, Math.PI * angel, true);
            ctx.fill();
        };
        var icos = $("#bottom_bar").find("div");
        var ctxs = [];
        icos.prepend(canvas);
        icos.find("canvas").each(function (n, i) {
            ctxs.push(i.getContext("2d"));

        });


        var interval1 = window.setInterval(function () {
            angel += window.CDtime;
            if (angel >= 2) {
                window.clearInterval(interval1);
                $("canvas").remove();
                window.icoDisableIco = false;
            } else {
                for (var i = 0; i < ctxs.length; i++) {
                    var ctx = ctxs[i];
                    drawCircle(angel, ctx);
                }
            }

        }, 10);

    }


    c.addDeBuffIco=function(type,src){
       var img=document.createElement("img");
       $(img).attr({"type":type ,"src":src})
       .css({"width":"50px"});
       $("#debuffPanel").prepend(img);
    };



    c.removeDeBuffIco=function(type){
    $("#debuffPanel").find("img").each(function(n,i){
      if($(this).attr("type")===type){
         var _this=this;
          $(this).fadeOut(500,function(){
               $(_this).remove();
          });
      }
    });
 }

     c.addBuffIco=function(type,src){
       var img=document.createElement("img");
       $(img).attr({"type":type ,"src":src})
       .css({"width":"50px"});
       $("#buffPanel").prepend(img);
    };



    c.removeBuffIco=function(type){
    $("#buffPanel").find("img").each(function(n,i){
      if($(this).attr("type")===type){
         var _this=this;
          $(this).fadeOut(500,function(){
               $(_this).remove();
          });
      }
    });
 }

     c.Shake=function(who){
         var enemy;
         if(who){
             enemy=$(".Enemy");
         }else{
         enemy=$(".myMan");
         }
         var top=window.parseInt(enemy.css("top"));
         var left=window.parseInt(enemy.css("left"));
         enemy.animate({"left":(left-20)+"px"},20,function(){
             enemy.animate({"left":(left+20)+"px"},40,function(){
                    enemy.animate({"left":left+"px"},40,function(){
                        window.shakeing=false;
                     });
             });
         });
        
 
 
     };
    var logTemple=[
       '  <div class="a_log">                       ',
       ' <span class="leftLogName">{0}</span>       ',
       ' <span class="leftLogDian">{1}</span>       ',
       ' </div>                                     '
    
    ].join('');

    c.insertLog=function(n1,n2){
    var html=logTemple.replace(/{\d+}/g,function(match){
      switch(match){
        case "{0}" :return n1;break;
        case "{1}" :return n2;break;
      }
    });
        $("#leftLog").prepend(html);
    
    
    };

    c.attack=function(){
     s.playAttack();
     var dmg = window.parseInt(Math.random() * 300);
      c.insertLog('<font color="blue">普通攻击</font>',dmg+'伤害');
      c.showDmgTip(dmg);
    }


     c.hit=function(){
     c.Shake(0);
    s.playAttack();
    s.playHit();
     var dmg = window.parseInt(Math.random() * 300);
            c.insertLog('<font color="red">被攻击</font>',dmg+'伤害');
            c.showHitTip(dmg);
    }

    c.updateStart=function(){
      
       $(".startContainer").html("");
           for(var i=0; i<window.start;i++){
           var div=document.createElement("div");
           $(div).addClass("start");
           $(".startContainer").append(div);
       }
       
    };

    c.showDmgTip=function(dmg){
    
        var div=document.createElement("div");
        $("#wrapper").append(div);
        $(div).addClass("dmgTip")
        .html(dmg);
        window.setTimeout(function(){
        $(div).css({"top":"200px","left":"160px","opacity":"0"});
        },0);
       

    }

        c.showHitTip=function(dmg){
    
        var div=document.createElement("div");
        $("#wrapper").append(div);
        $(div).addClass("hitTip")
        .html(dmg);
           window.setTimeout(function(){
           
            $(div).css({"top":"200px","left":"960px","opacity":"0"});
           })
        
    };


    c.huoqiu=function(){
      window.huoqiuing=true;
        $(".inner").animate({"width":"100%"},10000,function(){
        });
    
    }

})();
window.Common.disableTouchmove();

window.attackInterval=window.setInterval(function(){
   window.Common.attack();

},2000);


window.hitInterval=window.setInterval(function(){
   window.Common.hit();

},3000);


window.setInterval(function(){
  $(".dmgTip").remove();
    $(".hitTip").remove();
},10000);