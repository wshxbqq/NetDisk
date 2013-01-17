using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
namespace EXT_Console
{       
    class Program
    {
        public static PingShu.DAL.Book DAL_BOOK = new PingShu.DAL.Book();
        public static PingShu.DAL.Story DAL_STORY = new PingShu.DAL.Story();
        static string path = System.Environment.CurrentDirectory;
        static void Main(string[] args)
        {
            setDB();
            Console.ReadLine();

        }
        public static void setDB() {
            int i;
            var storyList =  DAL_STORY.GetPagedModelList(1, int.MaxValue, "1=1", "", out i);
            foreach (PingShu.Entity.Story story in storyList)
            {
                var reg = new Regex(@"\d+", RegexOptions.IgnoreCase);
                string sn = story.StoryName.Replace("mp3","") ;
                var matchStr = reg.Match(sn).Value;
                if (matchStr == "")
                {
                    matchStr = "1";
                }
                if (matchStr.Length > 5)
                {

                    matchStr = matchStr.Substring(5);
                }
                int sort = Convert.ToInt32(matchStr);
                sort = Math.Abs(sort);
                story.StorySort = sort;
                DAL_STORY.Merge(story);

            }

            DAL_STORY.CommitChanges();    
        
        }





        public static void getTask()
        {
            StringBuilder sb = new StringBuilder();
            DirectoryInfo di = new DirectoryInfo("D:/PingShu/WEB/DATA/");
            FileInfo[] fs = di.GetFiles("*.*", SearchOption.AllDirectories);
            int i;
            var DBlist = DAL_STORY.GetPagedModelList(1, int.MaxValue, "1=1", "", out i);
            var HAVElist = new List<int>();
            var DBlist1 = new List<int>();
            foreach (FileInfo f in fs)
            {
                if(f.Name.Contains("jpg")){
                    continue;
                }
                HAVElist.Add(Convert.ToInt32(f.Name.Split('.')[0]));
            }
            foreach (PingShu.Entity.Story s in DBlist)
            {
                DBlist1.Add(s.StoryId);
            }
            foreach (int _s in DBlist1)
            {
                if (HAVElist.Contains(_s))
                {
                    continue;
                }
                sb.Append(_s + ",");
            }

            File.WriteAllText("d:/task.txt",sb.ToString().Trim(','));

        }
        public static void removeGubish()
        {
            var removeCont = 0;
            DirectoryInfo di = new DirectoryInfo("D:/PingShu/WEB/DATA/");
            FileInfo[] fs = di.GetFiles("*.*", SearchOption.AllDirectories);
            foreach (FileInfo f in fs)
            {
                if (f.Length < 700)
                {
                    removeCont++;
                    Console.WriteLine("删除文件："+removeCont + " 移除");
                    f.Delete();
                };
            };
            Console.WriteLine(removeCont + " 移除");
            Console.Read();
        }
        public static void get404Book() {
            StringBuilder sb = new StringBuilder();
            DirectoryInfo di = new DirectoryInfo("D:/log/");
            FileInfo[] fs = di.GetFiles("*.*", SearchOption.AllDirectories);
            int i;
            var DBlist = DAL_STORY.GetPagedModelList(1, int.MaxValue, "1=1", "", out i);
            var list404 = new List<int>();
            var DBlist1 = new List<int>();
            foreach (FileInfo f in fs)
            {
                if (f.Name.Contains("jpg"))
                {
                    continue;
                }
                var storyId = Convert.ToInt32(f.Name.Split('.')[0]);
                var story = DAL_STORY.GetModel(storyId);

                list404.Add(story.BookId.BookId);
            }


            foreach (int _s in list404)
            {
               
                sb.Append(_s + ",");
            }

            File.WriteAllText("d:/404.txt", sb.ToString().Trim(','));
        
        
        
        }

    }


}
