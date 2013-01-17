using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

public partial class Logic_Story : PageBase
{
    public PingShu.Entity.Story storyInner;
    public PingShu.Entity.Book bookInner;
    public string bookOfStory;
    public string currentIndex;
    PingShu.DAL.Story DAL_story = new PingShu.DAL.Story();
    PingShu.DAL.Book DAL_book = new PingShu.DAL.Book();
    protected void Page_Load(object sender, EventArgs e)
    {
        string _storyID = common.getParamer("storyID", "1");
        int storyID = Convert.ToInt32(_storyID);
        storyInner = DAL_story.GetModel(storyID);
         bookInner = storyInner.BookId;
         var storyList = common.getStoryList(bookInner);

        StringBuilder sb = new StringBuilder();
        LitJson.JsonWriter JW = new LitJson.JsonWriter(sb);
        JW.WriteArrayStart();



        foreach (PingShu.Entity.Story sty in storyList)
        {

            if (sty.StoryId == storyID)
            {
                currentIndex = storyList.IndexOf(sty).ToString();
            }
            storyList.IndexOf(sty);

            JW.WriteObjectStart();

            JW.WritePropertyName("storyName");
            JW.Write(sty.StoryName);

            JW.WritePropertyName("path");
            JW.Write(common.getMp3Path(sty.StoryId));

            JW.WriteObjectEnd();

        }
        JW.WriteArrayEnd();
        
        //[{"storyName":"第一回","path":"/1.mp3"},{"storyName":"第二回","path":"/2.mp3"}]
        bookOfStory = sb.ToString();


        //增加阅读
        storyInner.StoryListenCount++;
        DAL_story.Update(storyInner);
        DAL_story.CommitChanges();


        bookInner.BookReadCount++;
        DAL_book.Update(bookInner);
        DAL_book.CommitChanges();


    }
}