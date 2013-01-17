using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_Login : PageBase
{
    public PingShu.DAL.UserInfo DAL_UserInfo = new PingShu.DAL.UserInfo();
    protected void Page_Load(object sender, EventArgs e)
    {
        header1.HeaderName = "登陆";

        if (Session["uid"] != null)
        {
            var user = DAL_UserInfo.GetModel(Convert.ToInt32(Session["uid"]));
            loginPageContainer.InnerHtml = "欢迎您" + user.UserName;
            loginPageContainer.InnerHtml += "<br/><button id=\"logout_button\">退出/登出</button>";
        }
        else { 
        
        
        }

    }
}