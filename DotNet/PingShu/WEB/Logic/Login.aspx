<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Logic_Login" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="loginPage" runat="server">
     <uc2:header ID="header1" runat="server" />
    <div data-role="content" id="loginPageContainer" runat="server" >	
     <div style=" height:45px">
       <div style=" width:20%; overflow:hidden; float:left; text-align:center;line-height: 45px; font-size:20px; font-weight:bolder; min-width:80px">用户名:</div>
       <div style=" width:70%; overflow:hidden; float: right"><input id="username" /></div>
     </div>

     <div style=" height:45px">
       <div style=" width:20%; overflow:hidden; float:left; text-align:center;line-height: 45px; font-size:20px; font-weight:bolder; min-width:80px">密码:</div>
       <div style=" width:70%; overflow:hidden; float: right"><input id="userpwd" type="password" /></div>
     </div>

     <div style=" margin-top:20px; width:80%; margin:0px auto 0px auto">
     <h1 id="login_label" style=" color:Red"></h1>
     <div style=" float:left; width:40%"><button data-theme="b" id="loginBtn">登陆</button></div>
       <div style=" float: right; width:40%"><button data-theme="b" id="regBtn">注册</button></div>
     </div>
	</div><!-- /content -->
     <uc1:footer ID="footer1" runat="server" />
</div>
<script>
    if (!window.__PingShu) {
        location.href = "/index.html"
    }
</script>
