<?php 
session_start();

$_SESSION["login"]="logined";


echo($_SESSION["login"])
/*
$url='http://t.qq.com'; 
$lines_array=file($url); 
$lines_string=implode('',$lines_array);
 echo htmlspecialchars($lines_string);
*/


/* class zyf{
     public $a;
     public $b;
     function show($c){

          $d=$c+2;

          echo  $d;

     }

}

$xin = new zyf();
$xin->show(1);  //输出为 3
$d=exec("date");
echo "string";*/
/*
$mysql_server_name='localhost'; 
$mysql_username='root'; 
$mysql_password='root'; 
$mysql_database='nodejs'; 
$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password,$mysql_database); 
$sql='select * from people'; 
$result=mysql_query($sql); 
//echo $sql; 
mysql_close($conn); */

?>