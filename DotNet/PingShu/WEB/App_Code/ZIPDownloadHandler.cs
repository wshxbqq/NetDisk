using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

public class ZIPDownloadHandler : RangeRequestHandlerBase
{
    //protected override bool CheckAuthorizationRules(HttpContext context)
    //{
    //    // Only allow authenticated users to download ZIP files
    //    if (context.Request.IsAuthenticated == false)
    //    {
    //        context.Response.StatusCode = 200;
    //        base.AddHeader(context.Response, "Content-Type", "text/html");
    //        context.Response.Write("<h1>You must sign in before you can download any ZIP files...</h1>");
    //        return false;
    //    }
    //
    //    return true;
    //}

    public override FileInfo GetRequestedFileInfo(HttpContext context)
    {
        if (File.Exists(context.Request.PhysicalPath))
            return new FileInfo(context.Request.PhysicalPath);
        else
            return null;
    }

    public override string GetRequestedFileMimeType(HttpContext context)
    {
        return "application/x-zip-compressed";
    }
}
