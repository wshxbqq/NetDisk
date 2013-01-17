using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace DotLog.DAL
{
    public partial class DotDnu : AbstractDataAcess<DotLog.Entity.DotDnu, int>
    {
        public override string TableName
        {
            get
            {
                return "DotDnu";
            }
        }
    }
}
