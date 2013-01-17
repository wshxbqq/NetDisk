using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace PingShu.DAL
{
    public partial class UserInfo : AbstractDataAcess<PingShu.Entity.UserInfo, int>
    {
        public override string TableName
        {
            get
            {
                return "UserInfo";
            }
        }
    }
}
