using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_Hot : PageBase
{
    PingShu.DAL.Book DAL_Book = new PingShu.DAL.Book();
    List<PingShu.Entity.Book> listBooks;
    protected void Page_Load(object sender, EventArgs e)
    {
        int i;
        listBooks = DAL_Book.GetPagedModelList(1, 20, "1=1", "Book_Read_Count desc", out i);
        repeater_hot.DataSource = listBooks;
        repeater_hot.DataBind();
        header1.HeaderName = "热门推荐";
    }
}