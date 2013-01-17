using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Logic_Artist : PageBase
{
    public IList<PingShu.Entity.Artist> artistList;
    public PingShu.Entity.ArtType artType;
    PingShu.DAL.ArtType DAL_ArtType = new PingShu.DAL.ArtType();
    PingShu.DAL.Artist DAL_artist = new PingShu.DAL.Artist();
    protected void Page_Load(object sender, EventArgs e)
    {
        int ArtTypeID = Convert.ToInt32(common.getParamer("ArtTypeID","1"));
        artType = DAL_ArtType.GetModel(ArtTypeID);
        artistList = artType.ArtistList;
        repeater_Artist.DataSource = artistList;
        repeater_Artist.DataBind();
        header1.HeaderName=artType.ArtTypeName;
    }
}