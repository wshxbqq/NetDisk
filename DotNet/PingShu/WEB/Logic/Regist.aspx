<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Regist.aspx.cs" Inherits="Logic_Regist" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="RegistPage" runat="server">
     <uc2:header ID="header1" runat="server" />
    <div data-role="content" id="RegistPageContainer" id="Regist_container" >	

     <div style=" height:45px">
       <div style=" width:20%; overflow:hidden; float:left; text-align:center;line-height: 45px; font-size:20px; font-weight:bolder; min-width:80px">用户名:</div>
       <div style=" width:70%; overflow:hidden; float: right"><input id="username_reg" /></div>
     </div>

     <div style=" height:45px">
       <div style=" width:20%; overflow:hidden; float:left; text-align:center;line-height: 45px; font-size:20px; font-weight:bolder; min-width:80px; margin-top:10px">密码:</div>
       <div style=" width:70%; overflow:hidden; float: right"><input id="username_pwd" type="password" /></div>
     </div>


     <div style=" height:45px;">
       <div style=" width:20%; overflow:hidden; float:left; text-align:center;line-height: 45px; font-size:20px; font-weight:bolder; min-width:80px; margin-top:10px">重输入:</div>
       <div style=" width:70%; overflow:hidden; float: right"><input id="username_pwd1" type="password" /></div>
     </div>


     <h1 style=" color:Red" id="reg_Label"></h1>
      <div style=" min-width:300px; width:50%; margin:30px auto 0px auto">  <button data-role="button" data-theme="b"  id="QuickregBtn">注册</button></div>
    
	</div><!-- /content -->
     <uc1:footer ID="footer1" runat="server" />
</div>

<script>
    if (!window.__PingShu) {
        location.href = "/index.html"
    }
</script>
