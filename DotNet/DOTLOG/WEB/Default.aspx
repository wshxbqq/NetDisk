<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">



    <asp:Panel ID="Panel1" runat="server">
     <asp:TextBox ID="TextBox_name"  runat="server"></asp:TextBox>
     <hr />
      <asp:TextBox ID="TextBox_pwd"  runat="server"></asp:TextBox>
      <hr />
        <asp:Button ID="Button_login" runat="server" Text="Button" onclick="Button_login_Click" />
    </asp:Panel>

    <asp:Panel ID="Panel2" runat="server" Visible="false">
        <asp:Button ID="Button_Commit" runat="server" Text="提交"    onclick="Button_Commit_Click" />
    <asp:TextBox ID="TextBox_appId"  runat="server"></asp:TextBox>
    <asp:CheckBox ID="CheckBox_showList" runat="server" Text="显示列表" />
    <hr />
   DNU: <asp:Label ID="Label_DNU" runat="server" Text=""></asp:Label>
    <br />
    DAU: <asp:Label ID="Label_DAU" runat="server" Text=""></asp:Label>
    <asp:GridView ID="GridView_dau" runat="server"  ViewStateMode="Disabled"> </asp:GridView>
    <hr />
    <asp:GridView ID="GridView_dnu" runat="server" ViewStateMode="Disabled"> </asp:GridView>
    </asp:Panel>

    </form>
</body>
</html>
