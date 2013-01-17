using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    DotLog.DAL.DotDau DAL_DAU = new DotLog.DAL.DotDau();
    DotLog.DAL.DotDnu DAL_DNU = new DotLog.DAL.DotDnu();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["login"] != null)
        {
            Panel1.Visible = false;
            Panel2.Visible = true;
        }
        else {
            Panel1.Visible = true;
            Panel2.Visible = false;
        
        }
    }
    void bindDau(string appId)
    {
        string dataStr = DateTime.Now.Date.ToShortDateString();
        int i = 0;
        string sqlQueryStr = "DauAppId='" + appId + "' and  DauTime between '" + dataStr + " 00:00:00.000' and '" + dataStr + " 23:59:59.000'";
        var list = DAL_DAU.GetPagedModelList(1, int.MaxValue, sqlQueryStr, "", out i);
        if (CheckBox_showList.Checked)
        {
                GridView_dau.DataSource = list;
                  GridView_dau.DataBind();
        }

        Label_DAU.Text = i.ToString();

    }

    void bindDnu(string appId)
    {
        string dataStr = DateTime.Now.Date.ToShortDateString();
        int i = 0;
        string sqlQueryStr = "DnuAppId='" + appId + "' and  DnuTime between '" + dataStr + " 00:00:00.000' and '" + dataStr + " 23:59:59.000'";
        var list = DAL_DNU.GetPagedModelList(1, int.MaxValue, sqlQueryStr, "", out i);
        if (CheckBox_showList.Checked) { 
            GridView_dnu.DataSource = list;
            GridView_dnu.DataBind();
        }
        
        Label_DNU.Text = i.ToString();

    }
    protected void Button_Commit_Click(object sender, EventArgs e)
    {
        string appID = TextBox_appId.Text;
        bindDau(appID);
        bindDnu(appID);
    }
    protected void Button_login_Click(object sender, EventArgs e)
    {
        if (TextBox_name.Text == "wshxbqq" && TextBox_pwd.Text == "3803756")
        {
            Panel1.Visible = false;
            Panel2.Visible = true;
            Session["login"] = "1";
        
        }
    }
}