using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_MyFavourite : PageBase
{
    PingShu.DAL.Book DAL_Book = new PingShu.DAL.Book();
    List<PingShu.Entity.Book> listBooks;
    protected void Page_Load(object sender, EventArgs e)
    {
        header1.HeaderName = "收藏夹";
        if(Request.HttpMethod.ToLower()=="get"){
            return;
        }
        var favoutiteArray = getParam("favourite").Split(',');
        List<int> favourites = new List<int>();
        foreach (string s in favoutiteArray)
        {
          if(s!=""){
              favourites.Add(Convert.ToInt32(s));
          }
        }
        StringBuilder sb = new StringBuilder();
        if (favourites.Count > 0) {
            string sqlStr = "";
            foreach (int i in favourites)
            {
                sqlStr += i + ",";
            }
            sqlStr = sqlStr.Trim(',');
            sqlStr = common.SqlFilter(sqlStr);
            int pages;
            listBooks = DAL_Book.GetPagedModelList(1, 10, "Book_ID in (" + sqlStr + ")", "", out pages);
            listBooks.ForEach(delegate(PingShu.Entity.Book bookInner)
            {
                sb.Append("<li><a href=\"/Logic/Book.aspx?BookID=" + bookInner.BookId + "\">");
                sb.Append("<h3>" + bookInner.BookName + "</h3>");
                sb.Append("</a>");
                sb.Append("<a dataFor=\"DelFavourite\" bookID=\"" + bookInner.BookId + "\"  data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" data-icon=\"minus\">收藏</a>");
                sb.Append("</li>");
            });
        }
      
        Response.Clear();
        Response.Write(sb.ToString());
        Response.End();
        

       
    
    }
}