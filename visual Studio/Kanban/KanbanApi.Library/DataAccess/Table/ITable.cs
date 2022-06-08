using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DTOs.Requests.Table;
using KanbanApi.Library.Models.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Table
{
    public interface ITable
    {
        public List<TableModel> GetAllTablesOnBoard(Guid BoardId);
        TableModel GetSelectedTableOnBoard(Guid BoardId, Guid TableId);
        void AddTable(CreateTableRequest createTable);
        void UpdateTable(UpdateTableRequest updateTable);
        void DeleteTable(DeleteTableRequest deleteTable);
        void MoveTable(MoveTableRequest moveTable);
    }
}
