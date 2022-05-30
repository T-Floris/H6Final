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
            _sql.SaveData("spTable_Add", new { createTable.BoardId, createTable.Name }, DatabaseName);
        }

        public void DeleteTable(DeleteTableRequest deleteTable)
        {
            _sql.DeleteData("spTable_Delete", new { deleteTable.BoardId, deleteTable.TableId }, DatabaseName);
        }

        public void MoveTable(MoveTableRequest moveTable)
        {
            _sql.UpdateData("spTable_Move", new { moveTable.BoardId, moveTable.TableId }, DatabaseName);
        }

        public void UpdateTable(UpdateTableRequest updateTable)
        {
            _sql.UpdateData("spTable_Edit", new { updateTable.BoardId, updateTable.TableId, updateTable.Name }, DatabaseName);
        }
    }
}
