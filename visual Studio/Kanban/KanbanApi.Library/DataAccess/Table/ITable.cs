using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DTOs.Requests.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Table
{
    public interface ITable
    {
        void AddTable(CreateTableRequest createTable);
        void UpdateTable();
        void DeleteTable();
        void MoveTable();
    }
}
