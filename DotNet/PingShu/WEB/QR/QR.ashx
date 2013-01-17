<%@ WebHandler Language="C#" Class="QR" %>

using System;
using System.Web;
using System.Web.SessionState;
using ThoughtWorks.QRCode.Codec;
using ThoughtWorks.QRCode.Codec.Data;
using ThoughtWorks.QRCode.Codec.Util;

public class QR : IHttpHandler,IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        string text = common.getParamer("QR","NULL");
        QRCodeEncoder qrCodeEncoder = new QRCodeEncoder();
        System.Drawing.Image image = qrCodeEncoder.Encode(text);
        System.IO.MemoryStream ms = new System.IO.MemoryStream();
        image.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        context.Response.ClearContent();
        context.Response.ContentType = "image/Jpeg";
        context.Response.BinaryWrite(ms.ToArray());
        image.Dispose();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}