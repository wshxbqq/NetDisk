<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MyFavourite.aspx.cs" Inherits="Logic_MyFavourite" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="MyFavourite" runat="server">
  <uc2:header ID="header1" runat="server" />

    <div data-role="content"  id="MyFavourite_Container">	
		<ul data-role="listview">
        </ul>
	</div><!-- /content -->


    <uc1:footer ID="footer1" runat="server" />
</div>

<script>
    if (!window.__PingShu) {
        location.href = "/index.html"
    }
</script>
