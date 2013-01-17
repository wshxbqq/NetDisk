using System;
using System.Collections.Generic;
using NHibernate;
using Gomye.NHibernate.DataAccess;

namespace PingShu.DAL
{
    public partial class Book : AbstractDataAcess<PingShu.Entity.Book, int>
    {
        public override string TableName
        {
            get
            {
                return "Book";
            }
        }
    }
}
