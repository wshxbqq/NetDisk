var mysql = require('mysql');  
var fs=require('fs');
  
var DATABASE = 'word';

var client = mysql.createConnection({
  host : 'localhost', 
  user: 'root',  
  password: '123',  
});
var SQL=function(){

};

SQL.getRowRandom=function(table,cb) {
    client.query('USE '+DATABASE);
    client.query(  
     "select * from "+SQL.safe(table)+" Order By RAND() limit 1",  
     function selectCb(err, results, fields) {  
       if (err) {  
         throw err;  
        }  
            cb(results[0]);  
        }
    );
};
SQL.createUser=function(userObj){
    client.query('USE '+DATABASE);
    client.query(
     "INSERT INTO users (UUID,user_name,create_date) VALUES('"+userObj.UUID+"','"+SQL.safe(userObj.user_name)+"',NOW())",  
     function selectCb(err, results, fields) {  
       if (err) {  
         throw err;  
       }
     }
    )
};

SQL.getUserByUUID=function(UUID,cb){
      client.query('USE '+DATABASE);
    client.query(
     "SELECT * FROM users where UUID='"+UUID+"'",  
     function selectCb(err, results, fields) {  
       if (err) {  
         throw err;  
       }
       cb(results[0]);
     }
    ) 
};

SQL.safe=function(str){
    return str;
};

module.exports=SQL;

