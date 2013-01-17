using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace PingShu.DAL
{
    public partial class Artist : AbstractDataAcess<PingShu.Entity.Artist, int>
    {
        public override string TableName
        {
            get
            {
                return "Artist";
            }
        }
    }
}
