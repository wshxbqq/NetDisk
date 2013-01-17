using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_BookList : PageBase
{
    public PingShu.Entity.Artist artistInner;
    public List<PingShu.Entity.Book> bookListInner;
    PingShu.DAL.Artist DAL_artist = new PingShu.DAL.Artist();
    PingShu.DAL.Book DAL_Book = new PingShu.DAL.Book();
    public int pageCount;
    protected void Page_Load(object sender, EventArgs e)
    {
        int ArtistID = Convert.ToInt32(common.getParamer("ArtistID","1"));
        artistInner = DAL_artist.GetModel(ArtistID);
        header1.HeaderName = artistInner.ArtistName;

        

        int Page = Convert.ToInt32(common.getParamer("page", "0"));
        bookListInner = DAL_Book.GetPagedModelList(Page, common.PageSize, "Artist_ID=" + ArtistID + "", "", out pageCount);
        int mob = pageCount % common.PageSize;
        if (mob > 0)
        {
            pageCount = Convert.ToInt32(pageCount / common.PageSize) + 1;
        }
        else {

            pageCount = Convert.ToInt32(pageCount / common.PageSize);
        }

        if (Page > 0)
        {
            Response.Clear();
            Response.Write(getAjaxHTML(bookListInner));
            Response.End();
        }
        else {
        }

        repeater_bookList.DataSource = bookListInner;
        repeater_bookList.DataBind();

    }

    string getAjaxHTML(List<PingShu.Entity.Book> BL) {
        StringBuilder sb = new StringBuilder();
        BL.ForEach(delegate(PingShu.Entity.Book book) {
            sb.Append("<li><a href=\"/Logic/Book.aspx?BookID="+book.BookId+"\">");
             sb.Append("<h3>"+book.BookName+"</h3>");
             sb.Append("</a>");
             sb.Append("<a dataFor=\"addFavourite\" bookID="+book.BookId+"  data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" data-icon=\"plus\">收藏</a>");
             sb.Append("</li>");
        
        });
        return sb.ToString();
    }
}