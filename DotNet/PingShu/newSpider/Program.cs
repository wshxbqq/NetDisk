using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace newSpider
{
    class Program
    {
        public static PingShu.DAL.Book DAl_BOOK = new PingShu.DAL.Book();
        public static PingShu.DAL.Story DAL_STORY = new PingShu.DAL.Story();
        static void Main(string[] args)
        {
            int i=0;
            var DBlist = DAL_STORY.GetPagedModelList(1, int.MaxValue, "", "", out i);
            DirectoryInfo di = new DirectoryInfo("D:/PingShu/WEB/DATA");
            var fs = di.GetFiles("*.*",SearchOption.AllDirectories);
            List<string> mp3List=new List<string>();
            List<string> mp3DBList = new List<string>();
            List<string> mp3Task = new List<string>();
            foreach (FileInfo fi in fs) {
                if (fi.Name.Contains("jpg"))
                {
                    continue;
                }
                else {
                    mp3List.Add(fi.Name.Split('.')[0]);
                }
            }

            foreach (PingShu.Entity.Story s in DBlist)
            {
                if (s.StoryDetails.Contains("play/play"))
                {
                    continue;
                }
                else {
                    mp3DBList.Add(s.StoryId.ToString());
                }
            }

            StringBuilder sb=new System.Text.StringBuilder();
            foreach (string str in mp3DBList)
            {
                if (!mp3List.Contains(str))
                {
                    mp3Task.Add(str);
                    sb.Append(str+",");
               }
            }

            File.WriteAllText("D:/task2.txt", sb.ToString());
            Console.WriteLine(mp3Task .Count+ "共计");
            Console.Read();
        }
    }
}
