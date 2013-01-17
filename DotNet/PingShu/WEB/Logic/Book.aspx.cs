using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_Book : PageBase
{
    public PingShu.Entity.Book bookEntity;
    public IList<PingShu.Entity.Story> storyList;
    PingShu.DAL.Book Dal_Book = new PingShu.DAL.Book();
    protected void Page_Load(object sender, EventArgs e)
    {
        int bookId = Convert.ToInt32(common.getParamer("BookID","1"));
        bookEntity = Dal_Book.GetModel(bookId);
        storyList = bookEntity.StoryList;

        var source = common.getStoryList(bookEntity);
        repeater_story.DataSource = source;
        repeater_story.DataBind();
        header1.HeaderName = bookEntity.BookName;
    }
}