<%@ WebHandler Language="C#" Class="XiaoHuaGetter" %>

using System;
using System.Web;
using System.Text;
public class XiaoHuaGetter : IHttpHandler {
    public static XiaoHua.DAL.Artcile DAl_Artcile = new XiaoHua.DAL.Artcile();
    public static XiaoHua.DAL.TypeChild DAl_TypeChild = new XiaoHua.DAL.TypeChild();
    public static XiaoHua.DAL.TypeRoot DAL_TypeRoot = new XiaoHua.DAL.TypeRoot();
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.Params["type"];
        switch (type)
        {
            case "getOne": getOneArticule(context); break;
        }
        
    }

    void getOneArticule(HttpContext context) {
        context.Response.ContentType = "text/plain";
        string functionName = context.Request.Params["function_name"];
        if (functionName==null)
        {
        
        }
        var DATA = DAl_Artcile.CreateSqlQuery("select top 1 *   from Artcile   order by newid ()").AddEntity(typeof(XiaoHua.Entity.Artcile)).List()[0];
        XiaoHua.Entity.Artcile artcile = (XiaoHua.Entity.Artcile)DATA;
        string result = "";
        StringBuilder sb = new StringBuilder();
        LitJson.JsonWriter JW = new LitJson.JsonWriter(sb);
        JW.WriteObjectStart();
        JW.WritePropertyName("title");
        JW.Write(artcile.ArticleTitle);
        JW.WritePropertyName("text");
        JW.Write(artcile.ArticleText);
        JW.WritePropertyName("readCount");
        JW.Write(artcile.ArticleReadCount);
        JW.WriteObjectEnd();
        result += functionName + "(" + sb.ToString() + ")";
        context.Response.Write(result);
        context.Response.End();
    }
    
    public bool IsReusable {
        get {
            return false;
        }
    }

}