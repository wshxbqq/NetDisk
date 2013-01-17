<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Book.aspx.cs" Inherits="Logic_Book" %>
<%@ outputcache duration="7200" varybyparam="BookID" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="Book" runat="server">
     <uc2:header ID="header1" runat="server" />

    <div data-role="content" >	
		<ul data-role="listview">
         <asp:repeater runat="server" id="repeater_story">
          <ItemTemplate>
             <li storyID='<%#Eval("StoryId")%>'><a href="/Logic/Story.aspx?storyID=<%#Eval("StoryId")%>" ><%#Eval("StoryName")%></a></li>
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
