
var url_template = "http://www.baidu.com/s?ie=utf-8&bs=1&f=8&rsv_bp=1&rsv_spt=3&wd={0}&rsv_sug3=5&rsv_sug=0&rsv_sug1=4&rsv_sug4=69&inputT=958";
var page_array = [];
var task_array = [];
var fs = require('fs');

for (var i = 0; i < 100;i++){
    var page = require('webpage').create();
   
    page_array.push(page);
   
}

for (var j = 0; j < 1000000; j++) {
    var obj = {};
    obj.num = j;
    obj.url = url_template.replace("{0}", j);
    task_array.push(obj);
}

function open(page,data) {
    page.open(data.url, function (status) {
        var result = page.evaluate(function (data) {

            var data = document.title;
            return { "values": data }
            
        }, data);


  
        fs.write("./" + data.num + ".txt", JSON.stringify(result), 'w');
        page.render("file.png");
        open(page, task_array.pop());
        //Page is loaded!
        //phantom.exit();
    });
 

}





for (var k in page_array) {
  
    open(page_array[k], task_array.pop());
   

}

