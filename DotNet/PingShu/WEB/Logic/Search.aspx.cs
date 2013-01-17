using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_Search : PageBase
{
    public PingShu.Entity.Artist artist;
    public IList<PingShu.Entity.Book> bookList;
    PingShu.DAL.Book DAL_Book = new PingShu.DAL.Book();
    protected void Page_Load(object sender, EventArgs e)
    {
        header1.HeaderName = "搜索";
        var searchText = getParam("q");
        if(searchText!=""){
            initList(searchText);
            repeater_search.DataSource = bookList;
            repeater_search.DataBind();
        }
    }

    void initList(string text) { 
       int i=0;
       string safeText = common.SqlFilter(text);
       bookList = DAL_Book.GetPagedModelList(1, int.MaxValue, "Book_Name like '%" + safeText + "%'", "", out i);
    
    }
}