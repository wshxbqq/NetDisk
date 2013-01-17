using System;
using System.Diagnostics;
using System.Web;
using System.Net;
using System.IO;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Spider
{



    class Program
    {
        public static XiaoHua.DAL.Artcile DAl_Artcile = new XiaoHua.DAL.Artcile();
        public static XiaoHua.DAL.TypeChild DAl_Type = new XiaoHua.DAL.TypeChild();
        public static XiaoHua.DAL.TypeRoot DAL_TypeRoot = new XiaoHua.DAL.TypeRoot();
        static int Count = 0;

        public static List<XiaoHua.Entity.Artcile> articuleList;
        static void Main(string[] args)
        {

            ThreadPool.SetMaxThreads(5, 5);
            int i;
            articuleList = DAl_Artcile.GetPagedModelList(1, int.MaxValue, "ArticleReadCount=3", "", out i);
            foreach (XiaoHua.Entity.Artcile t in articuleList)
            {
               ThreadPool.QueueUserWorkItem(new WaitCallback(cb), t);
            }

            Console.WriteLine(articuleList.Count);
            Console.Read();
        }

        static void cb(object o)
        {

            XiaoHua.Entity.Artcile articule = (XiaoHua.Entity.Artcile)o;
            List<string> arg = new List<string>();
            WebKiss.WebKiss wk = new WebKiss.WebKiss();
            arg.Add(articule.Articleid.ToString());
            string urrl = articule.Extent;
            urrl = urrl.Replace("冷笑话", HttpUtility.UrlEncode("冷笑话"));
            arg.Add(urrl);

            wk.work(arg, delegate(string result)
            {
                try
                {
                    Regex reg = new Regex("#result#((.)|(\r)|(\n)|(\r\n))*?#result#");
                    string str = reg.Match(result).Value.Replace("#result#", "");
                    int id = Convert.ToInt32(str.Split('◆')[0]);
                    var list = str.Split('◆')[1].Trim('▲').Split('▲');


                    var artcule = DAl_Artcile.GetModel(id);
                    artcule.ArticleTitle = list[0];
                    artcule.ArticleText = list[1];
                    artcule.ArticleDate = DateTime.Now;
                    artcule.ArticleReadCount = 9;
                    DAl_Artcile.Update(artcule);
                    DAl_Artcile.CommitChanges();
                    Console.WriteLine(result);
                }
                catch { 
                
                }




              



            });

        }

    }


}
