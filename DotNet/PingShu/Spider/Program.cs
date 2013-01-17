using System;
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

        public static int artistID = 69;
        public static PingShu.DAL.Book DAl_BOOK = new PingShu.DAL.Book();
        public static PingShu.DAL.Story DAL_STORY = new PingShu.DAL.Story();
        public static int allCount=0;
        public static int downLoadedCount = 0;
        public static int ps115 = 0;
        public static int successCount = 0;
        public static int failCount = 0;
        public static string TXT = "";
        public static string __p;
        public static string DataPath;
        public static string delay;

        static void Main(string[] args)
        {
             __p = Console.ReadLine();
            DataPath = Console.ReadLine();
            delay = Console.ReadLine();
             TXT = File.ReadAllText(__p).Trim(',');
            var list = TXT.Split(',');
            List<int> taskList = new List<int>();
            List<int> haveList=new List<int>();
            DirectoryInfo di = new DirectoryInfo(DataPath);
            var fs=  di.GetFiles("*.mp3",SearchOption.AllDirectories);
             foreach(FileInfo f in fs){
                 haveList.Add( Convert.ToInt32(f.Name.Replace(f.Extension,"")));
             }
            foreach (string s in list)
            {
                if (haveList.Contains(Convert.ToInt32(s)))
                {
                    Console.WriteLine("have_"+s);
                    continue;
                }
                taskList.Add(Convert.ToInt32(s));

            };
            allCount = taskList.Count;
            //removeGubish();
            //return;


            DirectoryInfo di_404 = new DirectoryInfo("d:/log");
            var fs_404 = di_404.GetFiles();



            foreach (int id in taskList)
            {
                bool falg=false;
                PingShu.Entity.Story story = DAL_STORY.GetModel(id);
                foreach (FileInfo f in fs_404)
                {
                   int ID=Convert.ToInt32(f.Name.Split('.')[0]);
                    var _story=DAL_STORY.GetModel(ID);
                    if (_story.BookId.BookId== story.BookId.BookId)
                    {
                        falg = true;
                  }
                }
                if(falg){
                    Console.WriteLine("JUMPER_" + story.BookId.BookId);
                    continue;
                }
                ThreadPool.QueueUserWorkItem(new WaitCallback(downLoadMp3), story);
                if (delay!="0")
                {
                  Thread.Sleep(Convert.ToInt32(delay));
                }
               
            };
            Console.Read();
        }
        public static string getHTML(string url) {
          string HTML="";
          WebClient wc = new WebClient();
          HTML = wc.DownloadString(url);
          HTML = ToUtf8(Encoding.GetEncoding("GB2312"),HTML);
          return HTML;
        }

  

        public static string ToUtf8(Encoding encconding,string str) {
            var UTF8=Encoding.UTF8;
            var GB2312 = encconding;
          byte[]  bs= GB2312.GetBytes(str);
          byte[] newBs = Encoding.Convert(encconding, UTF8, bs);
          return UTF8.GetString(newBs);
        }

        public static string removeHTML(string Htmlstring)
        {
            //删除脚本   
            Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
            //删除HTML   
            Htmlstring = Regex.Replace(Htmlstring, @"<(.[^>]*)>", "", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"([\r\n])[\s]+", "", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(quot|#34);", "\"", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(amp|#38);", "&", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(lt|#60);", "<", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(gt|#62);", ">", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(nbsp|#160);", "   ", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(iexcl|#161);", "\xa1", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(cent|#162);", "\xa2", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(pound|#163);", "\xa3", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&(copy|#169);", "\xa9", RegexOptions.IgnoreCase);
            Htmlstring = Regex.Replace(Htmlstring, @"&#(\d+);", "", RegexOptions.IgnoreCase);
            Htmlstring.Replace("<", "");
            Htmlstring.Replace(">", "");
            Htmlstring.Replace("\r\n", "");
            return Htmlstring.Trim();
        }




        public static void downLoadMp3(object _story)
        {
            try
            {
                var story = (PingShu.Entity.Story)_story;
                var reg = new Regex(@"href=.*?(\.mp3|\.wma).*?""", RegexOptions.IgnoreCase);
                var html = getHTML(story.StoryDetails);

                string url = reg.Match(html).Value.Replace("href=", "").Replace("\"", "");
                int artTypeID = story.BookId.ArtistId.TypeId.ArtTypeId;
                int atristID = story.BookId.ArtistId.ArtistId;
                int bookID = story.BookId.BookId;
                int storyID = story.StoryId;
                var path = DataPath + "/" + artTypeID + "/" + atristID + "/" + bookID;
                var mp3Path = path + "/" + storyID + ".mp3";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                try
                {
                    string subString = "";
                    if (url.ToLower().Contains("mp3"))
                    {
                        subString = ".mp3";
                    
                    }
                    if (url.ToLower().Contains("wma"))
                    {
                        subString = ".wma";

                    }

  
                        if (url == "")
                        {
                            File.WriteAllText("D:/log1/" + story.StoryId + ".txt", story.StoryDetails + "\r\n" + url + "\r\n" + reg.Match(html));
                        }
                        else { 
                          Download(new Uri(url), path, storyID + subString);
                        }
                        

                       

                  
                }
                catch (WebException e)
                {
                    File.WriteAllText("D:/log/" + story.StoryId + ".txt", e.Message + "\r\n" + story.StoryDetails+"\r\n"+url);
                }

                successCount++;
            }
            catch (WebException e)
            {
                failCount++;

            }
            consoleWriter();
        
        }


        public static List<int> getReadyFile() {
            List<int> File_ready_ID = new List<int>();
            DirectoryInfo di = new DirectoryInfo("C:/PingShu/WEB/DATA/");
            FileInfo[] fs = di.GetFiles("*.*", SearchOption.AllDirectories);
            foreach (FileInfo f in fs)
            {
                File_ready_ID.Add(Convert.ToInt32(f.Name.Replace(f.Extension,"")));
            };
            return File_ready_ID;
        }

        public static void consoleWriter() {
            Console.Clear();
            Console.WriteLine("****************************************");
            Console.WriteLine("");
            Console.WriteLine("共计任务 " + allCount+"个");
            Console.WriteLine("已完成 " + downLoadedCount + "个");
            Console.WriteLine("");
            Console.WriteLine("****************************************");
            Console.WriteLine("");
            Console.WriteLine("本次完成 " + successCount + "个");
            Console.WriteLine("本次失败 " + failCount + "个");
            Console.WriteLine("");
            Console.WriteLine("****************************************");
            Console.WriteLine("");
            Console.WriteLine("完成率 " + (100*(successCount + downLoadedCount)) / allCount + "%");
            Console.WriteLine("");
            Console.WriteLine("****************************************");
        
        
        }
        public static void Download(Uri address, string localPath, string filename)
        {
            WebRequest request = WebRequest.Create(address);

            request.Timeout = 300000;
            WebResponse response;
            Stream s;
            //perform the GET request

            response = request.GetResponse();
            s = response.GetResponseStream();


            //get stream containing received data
            //open filestream for the output file
            FileStream fs = new FileStream(Path.Combine(localPath, filename), FileMode.Create, FileAccess.Write);
            //copy until all data is read 标准的缓存读取格式
            byte[] buffer = new byte[1024];
            int bytesRead = s.Read(buffer, 0, buffer.Length);
            while (bytesRead > 0)
            {
                fs.Write(buffer, 0, bytesRead);
                bytesRead = s.Read(buffer, 0, buffer.Length);
            }
            //close both streams
            fs.Close();
            s.Close();
            response.Close();

        }


    }



}
