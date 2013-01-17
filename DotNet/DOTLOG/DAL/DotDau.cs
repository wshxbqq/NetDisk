using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace DotLog.DAL
{
    public partial class DotDau : AbstractDataAcess<DotLog.Entity.DotDau, int>
    {
        public override string TableName
        {
            get
            {
                return "DotDau";
            }
        }
    }
}
