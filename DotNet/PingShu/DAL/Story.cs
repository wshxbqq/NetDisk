using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace PingShu.DAL
{
    public partial class Story : AbstractDataAcess<PingShu.Entity.Story, int>
    {
        public override string TableName
        {
            get
            {
                return "Story";
            }
        }
    }
}
