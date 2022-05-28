using KanbanApi.Library.DTOs.Requests.Table;
using KanbanApi.Library.Internal.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Table
{
    public class Table : ITable
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";
        public Table(ISqlDataAccess sql)
        {
            _sql = sql;
        }
        public void AddTable(CreateTableRequest createTable)
        {
            _sql.SaveData("", new { }, DatabaseName);
            throw new NotImplementedException();
        }

        public void DeleteTable()
        {
            throw new NotImplementedException();
        }

        public void MoveTable()
        {
            throw new NotImplementedException();
        }

        public void UpdateTable()
        {
            throw new NotImplementedException();
        }
    }
}
