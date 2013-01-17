<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Artist.aspx.cs" Inherits="Logic_Artist" %>
<%@ outputcache duration="7200" varybyparam="ArtTypeID" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="ArtistPage" runat="server">
    <uc2:header ID="header1" runat="server" />
    <div data-role="content" >	
		<ul data-role="listview">
         <asp:repeater runat="server" id="repeater_Artist">
          <ItemTemplate>
             <li><a href="/Logic/BookList.aspx?ArtistID=<%#Eval("ArtistId")%>"><%#Eval("ArtistName")%></a></li>
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
