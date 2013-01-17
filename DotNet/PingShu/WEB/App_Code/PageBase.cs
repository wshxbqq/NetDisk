using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

/// <summary>
///PageBase 的摘要说明
/// </summary>
public class PageBase : System.Web.UI.Page
{
	public PageBase()
	{
	}

    public string getParam(string key) {
        if (Request.Params[key] != null)
        {
            return Request.Params[key];
        }
        else {
            return "";
        }
    
    }

    public string getReauestType()
    {
        string result = "http";
        foreach(string s in Request.Headers.AllKeys){
            if (s == "X-Requested-With")
            {
                result = "ajax";
            }
        }
        return result;
    }
}