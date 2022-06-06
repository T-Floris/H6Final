using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DTOs.Requests.Board;
using KanbanApi.Library.Internal.DataAccess;
using KanbanApi.Library.Models.Board;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Board
{
    public class Board : IBoard
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";

        public Board(ISqlDataAccess sql)
        {
            _sql = sql;
        }


        public void CreateBoard(CreateBoardRequest createBoard)
        {
            _sql.SaveData("spBoard_Create", new { createBoard.UserId, createBoard.Name }, DatabaseName);
        }

        public void DeleteBaord(Guid Id)
        {
            _sql.DeleteData("spBoard_Delete", new { Id }, DatabaseName);
        }

        public void UpdateBoard(UpdateBoardRequest updateBoard)
        {
            _sql.UpdateData("spBoard_Update", new { updateBoard.Id, updateBoard.Name, updateBoard.Description }, DatabaseName);
        }

        public BoardModel GetBoardById(Guid Id)
        {
            var output = _sql.LoadData<BoardModel, dynamic>("dbo.spGroup_Select", new { Id }, DatabaseName).FirstOrDefault();
            return output;
        }



        #region GroupBoard table
        public void AddGroupToBoard(AddGroupToBoardRequest addGroupToBoard)
        {
            _sql.DeleteData("spBoardGroup_AddGroup", new { }, DatabaseName);
        }

        public void RemoveGroupFromBoard(RemoveGroupFromBoardRequest removeGroupFromBoard)
        {
            _sql.DeleteData("spBoardGroup_RemoveGroup", new { removeGroupFromBoard.BoardId, removeGroupFromBoard.GroupId }, DatabaseName);
        }

        public void UpdateGroupRoleOnBoard(UpdateGroupRoleOnBoardRequest updateGroupRoleOnBoard)
        {
            _sql.UpdateData("spBoardGRoup_ChangeRole", new {  }, DatabaseName);
        }

        public List<BoardModel> GetBoards(Guid UserId)
        {
            var output = _sql.LoadData<BoardModel, dynamic>("dbo.spBoard_GetAll", new { UserId }, DatabaseName);
            return output;
        }

        public BoardModel GetBoardGroupIsMemberOff(Guid GroupId, Guid BoardId)
        {
            var output = _sql.LoadData<BoardModel, dynamic>("spGroupUser_HasAccess", new { GroupId, BoardId}, DatabaseName).FirstOrDefault();
            return output;
        }




        #endregion
    }
}
