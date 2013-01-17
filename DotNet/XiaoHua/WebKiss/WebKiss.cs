using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;
using System.Reflection;
using System.Text.RegularExpressions;
using System.IO;
using System.Diagnostics;

namespace WebKiss
{
    public class WebKiss
    {
        private Process p = new Process();

        public delegate void handle(string str);

        public void work(List<string>args, handle h)
        {

                p.StartInfo.FileName = Environment.CurrentDirectory + "\\phantomjs.exe";
                p.StartInfo.WorkingDirectory = Environment.CurrentDirectory;
                p.StartInfo.CreateNoWindow = true;
                p.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                p.StartInfo.UseShellExecute = false;
                var ArgString = "--output-encoding=GB2312 console.js";
                args.ForEach(delegate(string s) {
                    ArgString += " " + s;
                
                });

                p.StartInfo.Arguments = ArgString;
                p.StartInfo.RedirectStandardInput = true;
                p.StartInfo.RedirectStandardOutput = true;
                p.Start();
                StreamReader myStreamReader = p.StandardOutput;
                string myString = myStreamReader.ReadToEnd();
                myString = convertEncoding(myString, Encoding.GetEncoding("GB2312"), Encoding.UTF8);
                p.WaitForExit();
                p.Close();
                p.Dispose();
                h(myString);


        }
        public static string convertEncoding(string str, Encoding sourceEncoding, Encoding targetEncoding)
        {
            byte[] bs = sourceEncoding.GetBytes(str);
            byte[] newBs = Encoding.Convert(sourceEncoding, targetEncoding, bs);
            return targetEncoding.GetString(newBs);
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
        public static string getInner(string str, Regex reg)
        {
            string result = "";
            result = reg.Match(str).Value;
            return result;
        }

        public static List<string> getInnerList(string str, Regex reg)
        {
            var list = reg.Matches(str);
            var result = new List<string>();
            foreach (Match m in list)
            {
                result.Add(m.Value);
            }
            return result;
        }


        public static void downFile(string url, string path, string fileName)
        {
            WebClient wc = new WebClient();
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            wc.DownloadFile(url, path + "/" + fileName);
        }

        public static string downString(string Url)
        {
            WebClient wc = new WebClient();
            string result = wc.DownloadString(Url);
            return result;
        }
    }
}
