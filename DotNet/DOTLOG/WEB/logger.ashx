<%@ WebHandler Language="C#" Class="logger" %>

using System;
using System.Web;

public class logger : IHttpHandler {


    DotLog.DAL.DotDau DAL_DAU = new DotLog.DAL.DotDau();
    DotLog.DAL.DotDnu DAL_DNU = new DotLog.DAL.DotDnu();
 public void ProcessRequest(HttpContext context)
    {
        //禁用缓存
        disableCache(context);


        string appId = context.Request.Params["appid"];
        string type = context.Request.Params["type"];
        if (appId == null || type == null)
        {
            context.Response.Clear();
            context.Response.End();
        }


        switch (type)
        {
            case "dnu": addDNU(appId, type, context); break;
            case "dau": addDAU(appId, type, context); break;

        }
        context.Response.ContentType = "text/plain";
        context.Response.Write("0");
    }

    void addDNU(string appId, string type, HttpContext context)
    {
        DotLog.Entity.DotDnu dnu = new DotLog.Entity.DotDnu();
        dnu.DnuAppId = appId;
        dnu.DnuAgent = context.Request.Headers["User-Agent"];
        dnu.Dnuip = context.Request.UserHostAddress;
        dnu.DnuTime = DateTime.Now;
        dnu.Dnuuuid = context.Request.Params["UUID"];
        DAL_DNU.Add(dnu);

    }

    void addDAU(string appId, string type, HttpContext context)
    {
        DotLog.Entity.DotDau dau = new DotLog.Entity.DotDau();
        dau.DauAgent = context.Request.Headers["User-Agent"];
        dau.DauAppId = appId;
        dau.Dauip = context.Request.UserHostAddress;
        dau.DauTime = DateTime.Now;
        dau.Dauuuid = context.Request.Params["UUID"];
        DAL_DAU.Add(dau);
    }


    void disableCache(HttpContext context)
    {
        context.Response.Cache.SetNoStore();
        context.Response.Clear();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
