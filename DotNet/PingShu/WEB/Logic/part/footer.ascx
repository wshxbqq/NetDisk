<%@ Control Language="C#" AutoEventWireup="true" CodeFile="footer.ascx.cs" Inherits="Logic_part_footer" %>
    <div data-role="footer" data-position="fixed" id="footer_container" > 
        <div data-role="navbar"> 
            <ul> 
			    <li><a toLink="ArtType"  href="/Logic/ArtType.aspx" data-iconpos="top" data-icon="home" >分类</a></li>
                <li><a  toLink="Hot" href="/Logic/Hot.aspx" data-iconpos="top" data-icon="star" >热门</a></li>
			    <li><a toLink="MyFavourite" href="/Logic/MyFavourite.aspx"  data-iconpos="top" data-icon="grid" >收藏</a></li>
			    <li><a toLink="Search"  href="/Logic/Search.aspx"  data-iconpos="top" data-icon="search" >搜索</a></li>
                <li ><a toLink="Login"  href="/Logic/Login.aspx"  data-iconpos="top" data-icon="check" >同步</a></li>
            </ul> 
        </div>
    </div>