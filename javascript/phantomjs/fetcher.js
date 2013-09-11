
var url_template = "http://www.jokeji.cn/list29_{0}.htm";
var page_array = [];
var task_array = [];
var fs = require('fs');

for (var i = 0; i < 10;i++){
    var page = require('webpage').create();
   
    page_array.push(page);
   
}

for (var j = 1; j < 10000; j++) {
    var obj = {};
    obj.num = j;
    obj.url = url_template.replace("{0}", j);
    task_array.push(obj);
}

function open(page,data) {
    page.open(data.url, function (status) {});

    window.setTimeout(function(){

        var result = page.evaluate(function (data) {
            var r=false;
            var xiaohua_li=document.querySelectorAll(".list_title li");
            if (xiaohua_li.length) {
                r = [];
                for (var i = 0; i < xiaohua_li.length;i++) {
                    
                    var innerObj = {};
                    var li = xiaohua_li[i];
                    console.log(li);
                    innerObj.src = "http://www.jokeji.cn/" + li.querySelector("a").getAttribute("href");
                    innerObj.liulan = li.querySelector("span").innerText.replace("浏览：", "").replace("次", "");
                    innerObj.date = li.querySelector("i").innerText;
                    r.push(innerObj);
                }
            }
            return r;
        }, data);

         if (result) {
            console.log(result+"!!!!!!!!!!!!!!!!!!!!!!");
            fs.write("./xiaohua1/" + data.num + ".txt", JSON.stringify(result), 'w');
            //page.render("file.png");
            open(page, task_array.shift());
        }else
        {
		    open(page, task_array[0]);
           console.log(result+"####################################################################################################");
        }








    },10000);
    







 

}





for (var k in page_array) {
	
    open(page_array[k], task_array.shift());
   

}

