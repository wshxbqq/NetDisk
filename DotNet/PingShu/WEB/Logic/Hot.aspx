<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Hot.aspx.cs" Inherits="Logic_Hot" %>
<%--<%@ outputcache duration="7200" varybyparam="none" %>--%>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="HotPage" runat="server">
  <uc2:header ID="header1" runat="server" />
    <div data-role="content"  id="HotPage_Container">	
		<ul data-role="listview">
         <asp:repeater runat="server" id="repeater_hot">
          <ItemTemplate>
            <li><a href="/Logic/Book.aspx?BookID=<%#Eval("BookId")%>">
				<h3><%#Eval("BookName")%></h3>
				</a>
                <a dataFor="addFavourite" bookID="<%#Eval("BookId")%>"  data-rel="popup" data-position-to="window" data-transition="pop" data-icon="plus">收藏</a>
			</li>
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
