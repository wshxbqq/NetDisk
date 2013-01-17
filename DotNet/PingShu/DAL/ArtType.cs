using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace PingShu.DAL
{
    public partial class ArtType : AbstractDataAcess<PingShu.Entity.ArtType, int>
    {
        public override string TableName
        {
            get
            {
                return "ArtType";
            }
        }
    }
}
