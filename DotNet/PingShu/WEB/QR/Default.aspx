<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="QR_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>


    字符：<input type="text"  id="text1"/>
    <button id="btn">获得</button>
        <div>
   <img src="QR.ashx" id="img1" />
    
    </div>
 
    <script>
        var btn = document.getElementById("btn");
        var input = document.getElementById("text1");
        var img = document.getElementById("img1");
        btn.onclick = function () {
            img.src = "QR.ashx?QR=" + input.value+"&tsp="+Math.random()
         }
    
    </script>
</body>
</html>
