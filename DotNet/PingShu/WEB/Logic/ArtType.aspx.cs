using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_ArtType : PageBase
{
    public IList<PingShu.Entity.ArtType> artTypeList;
    PingShu.DAL.ArtType DAL_artType = new PingShu.DAL.ArtType();
    protected void Page_Load(object sender, EventArgs e)
    {
        int i;
        artTypeList = DAL_artType.GetPagedModelList(1,int.MaxValue,"1=1","",out i);
        repeater_artType.DataSource = artTypeList;
        repeater_artType.DataBind();
        header1.HeaderName = "分类";
    }
}