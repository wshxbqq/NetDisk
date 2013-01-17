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
        public static PingShu.DAL.Book DAl_BOOK = new PingShu.DAL.Book();
        public static PingShu.DAL.ArtType DAl_type = new PingShu.DAL.ArtType();
        public static PingShu.DAL.Story DAL_STORY = new PingShu.DAL.Story();
        public static PingShu.DAL.Artist DAL_artist = new PingShu.DAL.Artist();
        static string path = "D:/PingShu/WEB/DATA/";
        public static List<PingShu.Entity.Story> listStory = new List<PingShu.Entity.Story>();
        static int count = 0;
        static void Main(string[] args)
        {
            DirectoryInfo di = new DirectoryInfo("D:/PingShu/WEB/DATA/61");
            List<string> haves = new List<string>();
            var fs = di.GetFiles("*.mp3", SearchOption.AllDirectories);
            foreach (FileInfo f in fs)
            {
                if (f.Length < 800)
                {
                    f.Delete();
                    Console.WriteLine(f.Name + "_deleted");
                }
                else
                {
                    haves.Add(f.Name.Split('.')[0]);
                }
            }

            int i;
            var list_xiangsheng = DAl_BOOK.GetPagedModelList(1, int.MaxValue, "Artist_ID>=90", "", out i);
            foreach (PingShu.Entity.Book book in list_xiangsheng)
            {
                listStory.AddRange(book.StoryList);
            }



            foreach (PingShu.Entity.Story story in listStory)
            {
                if (haves.Contains(story.StoryId.ToString()))
                {
                    Console.WriteLine("jump" + story.StoryId);
                    continue;
                }
                Console.WriteLine("开始任务" + story.StoryName);
                cb(story);
               // ThreadPool.QueueUserWorkItem(new WaitCallback(cb), story);
            }
          
            Console.Read();
        }

        static void cb(object o)
        {

         
                PingShu.Entity.Story story = (PingShu.Entity.Story)o;
                string url = "http://www.tingchina.com/xiangsheng/" + story.StoryDetails;
                var obj=getLastString(url);
                string lastUrl =obj[0];
                string fileNameMp3 = obj[1];
                WebClient wc = new WebClient();
                wc.Headers.Clear();
                wc.Headers.Add("Cache-Control", "no-cache");
                wc.Headers.Add("Pragma", "getIfoFileURI.dlna.org");
                wc.Headers.Add("Accept", "*/*");
                wc.Headers.Add("User-Agent", "NSPlayer/12.00.7600.16597 WMFSDK/12.00.7600.16597");
                wc.Headers.Add("GetContentFeatures.DLNA.ORG", "1");
                string type = story.BookId.ArtistId.TypeId.ArtTypeId.ToString();
                string artist = story.BookId.ArtistId.ArtistId.ToString();
                string book = story.BookId.BookId.ToString();

                string path_s = "D:/PingShu/WEB/DATA/" + type + "/" + artist + "/" + book + "/";
                DirectoryInfo di = new DirectoryInfo(path_s);
                if (!di.Exists)
                {
                    di.Create();
                }

                string mp3Path = path_s + story.StoryId + ".mp3";
                wc.DownloadFile(lastUrl, mp3Path);
                story.StoryName = fileNameMp3;
                DAL_STORY.Update(story);
                DAL_STORY.CommitChanges();
                Console.WriteLine(story.StoryName + "__完成");
  

                  

        }
        public static  List<string> getLastString(string URL)
        {
            List<string> result = new List<string>();
            string html = getHTML(URL);
            var iframeReg = new Regex(@"/play/xiangsheng/.*?""");
            string url2 = iframeReg.Match(html).Value.Replace("\"", "");
            var html2 = getHTML("http://www.tingchina.com/" + url2);
            var downPathReg = new Regex(@"url\[3\]=.*?;");

            string fileName = url2.Replace("/play/xiangsheng/geturl.asp?filename=", "").Split('&')[0];

            var lastPath = "http://t52.tingchina.com/" + downPathReg.Match(html2).Value.Replace(";", "").Replace("url[3]=", "").Replace(" ", "").Replace("\"", "");
            var luanmaReg = new Regex(@"xiangsheng/.*?\?");
            lastPath = luanmaReg.Replace(lastPath, "xiangsheng/" + HttpUtility.UrlEncode(fileName, Encoding.GetEncoding("gb2312")) + "?");
            result.Add(lastPath);
            result.Add(fileName);
            return result;
        }
        public static string ToUtf8(Encoding encconding, string str)
        {
            var UTF8 = Encoding.UTF8;
            var GB2312 = encconding;
            byte[] bs = GB2312.GetBytes(str);
            byte[] newBs = Encoding.Convert(encconding, UTF8, bs);
            return UTF8.GetString(newBs);
        }
        public static string getHTML(string url)
        {
            string HTML = "";
            WebClient wc = new WebClient();
            HTML = wc.DownloadString(url);
            HTML = ToUtf8(Encoding.GetEncoding("GB2312"), HTML);
            return HTML;
        }
    }


}
