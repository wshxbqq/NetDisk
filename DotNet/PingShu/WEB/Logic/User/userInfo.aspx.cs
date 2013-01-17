using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_user_userInfo : PageBase
{
    public string ACTION;
    public PingShu.DAL.UserInfo DAL_UserInfo = new PingShu.DAL.UserInfo();
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        ACTION = getParam("action");
        string name = getParam("username");
        string pwd = getParam("userpwd");
        string favString = getParam("favString");
        string DelBookID = getParam("bookID");
        string AddBookID = getParam("bookID");
        switch (ACTION)
        {
            case "login":
                login(name,pwd, favString);
                ; break;
            case "logout":
                logout();
                ; break;
            case "regist":
                regist(name, pwd);
                ; break;
            case "setFavourite":
                if (Session["uid"] != null)
                {
                    string uid = Session["uid"].ToString();
                    setUserFavourite(uid, favString);
                }
                else {
                    Response.Write("false");
                }
                  break;
            case "AddFavourite":
                 if(Session["uid"]!=null){
                     AddFavourite(AddBookID);
                 }
                 else
                 {
                     Response.Write("false");
                 }
                 break;
            case "DelFavourite":
                 if(Session["uid"]!=null){
                     DelFavourite(DelBookID);
                 }
                 else
                 {
                     Response.Write("false");
                 }
                 break;
        }
    }

    void getUserFavourite(string uid) {
       int id = Convert.ToInt32(uid);
       var user = DAL_UserInfo.GetModel(id);
       Response.Write(user.UserFavourite);
    }

    void DelFavourite(string DelBookID)
    {
        StringBuilder sb = new StringBuilder();
        int uid = Convert.ToInt32(Session["uid"]);
        var user = DAL_UserInfo.GetModel(uid);
        string userFavStr = user.UserFavourite;
        List<int> listFav = new List<int>();
        var _array = userFavStr.Split(',');
        foreach (string s in _array) {
             if(s!="" && s!=DelBookID){
                 listFav.Add(Convert.ToInt32(s));
             }
        }

        foreach (int i in listFav)
        {
            sb.Append(i+",");
        }

        user.UserFavourite = sb.ToString().Trim(',');

        DAL_UserInfo.Update(user);
        DAL_UserInfo.CommitChanges();
        Response.Write("deleted_" + DelBookID);

    }

    void AddFavourite(string AddBookID){
        StringBuilder sb = new StringBuilder();
        int uid = Convert.ToInt32(Session["uid"]);
        var user = DAL_UserInfo.GetModel(uid);
        string userFavStr = user.UserFavourite;
        userFavStr += "," + AddBookID;
        List<int> listFav = new List<int>();
        var _array = userFavStr.Split(',');
        foreach (string s in _array)
        {
            if (s != "")
            {
                int bID = Convert.ToInt32(s);
                if (!listFav.Contains(bID))
                {
                    listFav.Add(Convert.ToInt32(s));
                }
            }
           
        }



        foreach (int i in listFav)
        {
            sb.Append(i + ",");
        }

        user.UserFavourite = sb.ToString().Trim(',');

        DAL_UserInfo.Update(user);
        DAL_UserInfo.CommitChanges();
        Response.Write("added_" + AddBookID);
    
    
    
    }
    void logout() {
        Session["uid"] = null;
        Response.Clear();
        Response.Write("true");
    }
    void login(string name, string pwd, string favString){
        string md5pwd = common.GetMD5Hash(pwd);
        string safeName = common.SqlFilter(name);
        var user = DAL_UserInfo.GetSingle("User_Name='" + safeName + "' and User_Pwd='" + md5pwd + "'");
        if (user != null)
        {
            Session["uid"] = user.UserId;
            List<int> favList = new List<int>();
            var _array = user.UserFavourite.Split(',');
            foreach (string s in _array)
            {
                if(s!=""){
                     favList.Add(Convert.ToInt32(s));
                }
            }
            var _array2=favString.Split(',');
            foreach (string s in _array2)
            {
                 if(s!=""){
                     var bookId=Convert.ToInt32(s);
                     if (!favList.Contains(bookId))
                     {
                       favList.Add(Convert.ToInt32(s));
                     }
                    
                }
            }

            StringBuilder sb = new StringBuilder();
            favList.ForEach(delegate(int i) {
                sb.Append(i+",");
            });
            user.UserFavourite = sb.ToString().Trim(',');
            DAL_UserInfo.Update(user);
            DAL_UserInfo.CommitChanges();
            Response.Write(user.UserFavourite);
        }
        else {
            Response.Write("false");
        }
    }

    void setUserFavourite(string uid,string favouriteString) {
        int id = Convert.ToInt32(uid);
        var user = DAL_UserInfo.GetModel(id);
        user.UserFavourite = favouriteString;
        DAL_UserInfo.CommitChanges();
        Response.Write("true");
    }

    void regist(string name , string pwd)
    {
        string md5pwd = common.GetMD5Hash(pwd);
        string safeName = common.SqlFilter(name);
        var user = DAL_UserInfo.GetSingle("User_Name='" + safeName + "'");
        if (user != null)
        {
            Response.Write("false");
        }
        else
        {
            PingShu.Entity.UserInfo Uifo = new PingShu.Entity.UserInfo();
            Uifo.UserName = safeName;
            Uifo.UserPwd = md5pwd;
            DAL_UserInfo.Add(Uifo);
            Session["uid"] = Uifo.UserId;
            Response.Write("true");
        }
    }
}