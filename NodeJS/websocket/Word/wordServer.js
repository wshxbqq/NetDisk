var sql = require('./sqlConnection');  
var fs=require('fs');

sql.getRowRandom("word_C6",function (data) {
    //console.log(data.word_cn);
});

/*
sql.createUser({
    UUID:"0xadhuiewhf-dskhfuioweuof-dfsf",
    user_name:"user_nameuser_name"
});

*/

sql.getUserByUUID("0xadhuiewhf-dskhfuioweuof-dfsf",function(data){
    console.log(data);
});
