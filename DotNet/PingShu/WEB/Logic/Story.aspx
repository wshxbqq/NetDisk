<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Story.aspx.cs" Inherits="Logic_Story" %>
<%@ Register src="part/footer.ascx" tagname="footer" tagprefix="uc1" %>
<%@ Register src="part/header.ascx" tagname="header" tagprefix="uc2" %>
<div data-role="page" id="Story" runat="server">
        <div data-role="header" data-position="fixed" id="story_header">  
      <button data-icon="back" class="backBtn" data-theme="b">后退</button>
      <h1><%=bookInner.BookName%></h1>
      <h2><%=storyInner.StoryName%></h2>
      <div style=" height:40px; margin-top:10px;">
         <input type="hidden"  id="story_id_hidden_val" value="<%=storyInner.StoryId%>" />
         <input id="player_slider" style=" display:none;"  type="range" name="slider-fill" id="slider-fill" value="0" min="0" max="100" data-highlight="true" />
      </div>
        
         </div><!-- /header -->

    <input type="hidden" id="hide_array_input"  value='<%=bookOfStory %>' />
    <input type="hidden" id="hide_array_index"  value='<%=currentIndex %>' />

　　<div data-role="content" > 
       <div id="XiaoHuaContainer" class="XiaoHuaContainer">
          <h3 id="xiaohua_title"></h3>
          <h4>点击任意处翻页</h4>
          <div id="xiaohua_text"></div>
       </div>
　　</div>
       <div class="clickTip" id="clickTip">如果没有自动播放<br /> 请双击下边的<span style=" color:#30BD04">播放</span>按钮</div>
　     <div data-role="footer" data-position="fixed" class="playerFootBar" id="story_footer" tapToggle="false">
             <div style=" width:100%;margin:10px auto 10px auto ">
               <div class="footer_player_UI">
                   <div class="leftSong"></div>
                   <div class="playSong"></div>
                   <div class="rightSong"></div>
               </div>
             </div>
       </div>

</div>

<script>
    if (!window.__PingShu) {
        location.href = "/index.html"
    }
</script>
