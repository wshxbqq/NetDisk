using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace XiaoHua.DAL
{
    public partial class Artcile : AbstractDataAcess<XiaoHua.Entity.Artcile, int>
    {
        public override string TableName
        {
            get
            {
                return "Artcile";
            }
        }
    }
}
