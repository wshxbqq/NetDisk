using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using System.Security.Cryptography;
using System.Web.Security;

/// <summary>
///common 的摘要说明
/// </summary>
public class common
{
    public const int PageSize = 20;
    public const int CoolDown = 20;
    public const int MaxDebt = 2000;
     


    public class Mp3Log
    {

        private string _IP;
        private DateTime _LastTime;
        private int _Debt;
        private int _visitCount;

        public string IP{
            get { return _IP;}
            set { _IP = value; }
        }
        public DateTime LastTime {
            get { return _LastTime; }
            set { _LastTime = value; }
        }
        public int Debt {
            get { return _Debt; }
            set { _Debt = value; }
        }
        public int VisitCount
        {
            get { return _visitCount; }
            set { _visitCount = value; }
        }
    }

    public static List<Mp3Log> logList = new List<Mp3Log>();

    public static PingShu.DAL.Story DAL_story = new PingShu.DAL.Story();
	public common()
	{

	}

    public static string getParamer(string ID, string defaultValue)
    {
        string result;
        if (HttpContext.Current.Request.Params[ID] != null)
        {
            result = HttpContext.Current.Request.Params[ID];
        }
        else {
            result = defaultValue;
        }
        return result;
    }

    public static string getParamer(string ID, string defaultValue,string type)
    {
        string result = "";

        switch (type)
        {
            case "post":
                    if (HttpContext.Current.Request.Form[ID] != null)
                    {
                        result = HttpContext.Current.Request.Form[ID];
                    }
                    else
                    {
                        result = defaultValue;
                    }
                ; break;
            case "get":
                if (HttpContext.Current.Request.QueryString[ID] != null)
                {
                    result = HttpContext.Current.Request.QueryString[ID];
                }
                else
                {
                    result = defaultValue;
                }
                ; break;
        }
        return result;
    }

    public static string getBase64(string path) {
        System.IO.FileStream fs = System.IO.File.OpenRead(path);//传文件的路径即可
        System.IO.BinaryReader br = new BinaryReader(fs);
        byte[] bt = br.ReadBytes(Convert.ToInt32(fs.Length));
        string base64String = Convert.ToBase64String(bt);
        br.Close();
        fs.Close();
        return base64String;
    }

    public static string sqlSafe(string s){
        return s;
     }

    public static string GetMD5Hash(String input)
    {
        string str = FormsAuthentication.HashPasswordForStoringInConfigFile(input, "MD5");

        return str;
    } 
    public static List<PingShu.Entity.Book> getBookListNoPicture() {
        int i;
        PingShu.DAL.Book DAL_Book = new PingShu.DAL.Book();
        var bookList = DAL_Book.GetPagedModelList(1,int.MaxValue,"1=1","",out i);
        List<PingShu.Entity.Book> listResult = new List<PingShu.Entity.Book>();
        foreach (PingShu.Entity.Book b in bookList)
        {
            string DATA_PATH = "~/DATA/" + b.ArtistId.TypeId.ArtTypeId + "/" + b.ArtistId.ArtistId + "/" + b.BookId + "/img";
            var abPath = HttpContext.Current.Server.MapPath(DATA_PATH);
            DirectoryInfo di = new DirectoryInfo(abPath);
            if (!di.Exists)
            {
                listResult.Add(b);
            }
            else {
                var fs = di.GetFiles();
                bool flag = false;
                foreach (FileInfo fi in fs)
                {
                    if (fs.Length>0)
                    {
                        flag = true;
                    }
                }

                if(!flag){
                    listResult.Add(b);
                }
            
            }
        }
        return listResult;
    }

    public static string getMp3Path(int storyID){

        var story = DAL_story.GetModel(Convert.ToInt32(storyID));
        string path = "/DATA/" + story.BookId.ArtistId.TypeId.ArtTypeId + "/" + story.BookId.ArtistId.ArtistId + "/" + story.BookId.BookId + "/" + story.StoryId+".mp3";
        return path;
    }

    public static List<PingShu.Entity.Story> getStoryList(PingShu.Entity.Book book, PingShu.Entity.Story story)
    {
        var storyList =new List<PingShu.Entity.Story>();
        foreach (PingShu.Entity.Story s in book.StoryList)
        {
            if (s.StorySort >= story.StorySort)
            {
                storyList.Add(s);
            }

        }
        storyList.Sort(delegate(PingShu.Entity.Story small, PingShu.Entity.Story big) { 
            return small.StorySort - big.StorySort; 
        });
        return storyList;
    }





    public static List<PingShu.Entity.Story> getStoryList(PingShu.Entity.Book book)
    {
        var storyList = new List<PingShu.Entity.Story>();
        foreach (PingShu.Entity.Story s in book.StoryList)
        {
                storyList.Add(s);
        }
        storyList.Sort(delegate(PingShu.Entity.Story small, PingShu.Entity.Story big) { 
            return small.StorySort - big.StorySort; 
        });
        return storyList;
    }


    public static bool isLegal(HttpContext context)
    {
        clearBeforeToday();
        bool result = false;
        string IP = context.Request.UserHostAddress;
        DateTime DT = DateTime.Now;

        bool flagContain = false;
        logList.ForEach(delegate(Mp3Log m)
        {
            if (m.IP == IP)
            {
                flagContain = true;
            }
        });

        if (flagContain)
        {
            var innerLog = logList.Find(p => p.IP == IP);
            var differ = DateTime.Now - innerLog.LastTime;
            innerLog.LastTime = DateTime.Now;
            var innerDebt = CoolDown - Convert.ToInt32(differ.TotalSeconds);
            innerLog.Debt += innerDebt;
            innerLog.VisitCount++;
            if (innerLog.Debt < 0)
            {
                innerLog.Debt = 0;
            }
            if (innerLog.Debt < MaxDebt)
            {
                result = true;
            }

        }
        else
        {
            Mp3Log log = new Mp3Log();
            log.IP = IP;
            log.LastTime = DateTime.Now;
            log.Debt = 0;
            log.VisitCount = 0;
            logList.Add(log);

            result = true;


        }



        return result;
    }

    public static void clearBeforeToday()
    {
        List<Mp3Log> _delList = new List<Mp3Log>();
        logList.ForEach(delegate(Mp3Log m)
        {
            if (m.LastTime.Date < DateTime.Now.Date)
            {
                _delList.Add(m);
            }
        });

        _delList.ForEach(delegate(Mp3Log _m)
        {
            if (logList.Contains(_m))
            {
                logList.Remove(_m);
            }
        });

    }

    public static string SqlFilter(string source)
    {
        //单引号替换成两个单引号
        source = source.Replace("'", string.Empty);

        //半角封号替换为全角封号，防止多语句执行
        source = source.Replace(";", string.Empty);

        //半角括号替换为全角括号
        source = source.Replace("(", string.Empty);
        source = source.Replace(")", string.Empty);

        ///////////////要用正则表达式替换，防止字母大小写得情况////////////////////

        //去除执行存储过程的命令关键字
        source = source.Replace("Exec", string.Empty);
        source = source.Replace("Execute", string.Empty);

        //去除系统存储过程或扩展存储过程关键字
        source = source.Replace("xp_", string.Empty);
        source = source.Replace("sp_", string.Empty);

        //防止16进制注入
        source = source.Replace("0x", string.Empty);

        return source;
    }

}