<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Search.aspx.cs" Inherits="Logic_Search" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="SearchPage" runat="server">
     <uc2:header ID="header1" runat="server" />
    <div data-role="content" id="SearchPage_Container" >	
      <div style="width:100%; background-color:#ccc;  height:60px;border-radius: 20px; margin-bottom:50px">
       <div style=" width:60%; float:left;height:75px; margin-left:3%; margin-top:3px">
           <input type="search" name="search" id="search" value="" />
       </div>
        <div style=" width:30%; float: right; height:75px;margin-right:3%">
           <button id="searchBtn" data-role="button" data-icon="search"  data-theme="b">OK</button>
        
        </div>
      </div>

		<ul data-role="listview" data-split-icon="gear" data-split-theme="d">
         <asp:repeater runat="server" id="repeater_search">
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
