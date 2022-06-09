using KanbanApi.Library.DTOs.Requests.Table;
using KanbanApi.Library.Internal.DataAccess;
using KanbanApi.Library.Models.Table;
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

        public List<TableModel> GetAllTablesOnBoard(Guid BoardId)
        {
            var tables = _sql.LoadData<TableModel, dynamic>("spTable_GetAllOnBoard", new { BoardId }, DatabaseName);
            return tables;
        }

        public TableModel AddTable(CreateTableRequest createTable)
        {
            var table = _sql.SaveData<TableModel, dynamic>("spTable_Add", new { createTable.BoardId, createTable.Name }, DatabaseName).FirstOrDefault();
            return table;
        }

        public void DeleteTable(DeleteTableRequest deleteTable)
        {
            _sql.DeleteData("spTable_Delete", new { deleteTable.BoardId, deleteTable.TableId }, DatabaseName);
        }

        public void MoveTable(MoveTableRequest moveTable)
        {
            _sql.UpdateData("spTable_Move", new { moveTable.TableId, moveTable.BoardId, moveTable.NewPosition }, DatabaseName);
        }

        public void UpdateTable(UpdateTableRequest updateTable)
        {
            _sql.UpdateData("spTable_Edit", new { updateTable.TableId, updateTable.Name }, DatabaseName);
        }

        public TableModel GetSelectedTableOnBoard(Guid BoardId, Guid TableId)
        {
            var tables = _sql.LoadData<TableModel, dynamic>("spTable_GetOnBoardById", new { BoardId, TableId }, DatabaseName).FirstOrDefault();
            return tables;
        }
    }
}
