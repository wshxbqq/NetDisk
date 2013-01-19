﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

public class MP3DownloadHandler : RangeRequestHandlerBase
{
    //protected override bool CheckAuthorizationRules(HttpContext context)
    //{
    //    // Only allow users in the "Admin" role to view videos
    //    if (context.User.IsInRole("Admin") == false)
    //    {
    //        context.Response.StatusCode = 200;
    //        base.AddHeader(context.Response, "Content-Type", "text/html");
    //        context.Response.Write("<h1>Only Admins are allowed to view videos...</h1>");
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
        return "audio/mpeg";
    }
}