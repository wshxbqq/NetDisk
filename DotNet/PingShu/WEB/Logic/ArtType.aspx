<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ArtType.aspx.cs" Inherits="Logic_ArtType" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="ArtTypePage" runat="server">
    <uc2:header ID="header1" runat="server" />
    <div data-role="content" >	
		<ul data-role="listview">
         <asp:repeater runat="server" id="repeater_artType">
          <ItemTemplate>
            <li><a href="/Logic/Artist.aspx?ArtTypeID=<%#Eval("ArtTypeId")%>"><%#Eval("ArtTypeName")%></a></li>
          </ItemTemplate>
         </asp:repeater>
     </ul>
	</div><!-- /content -->


     <uc1:footer ID="footer1" runat="server" />

</div>


<script>
    if (!window.__PingShu) {
        location.href = "/index.html"
    }
</script>
