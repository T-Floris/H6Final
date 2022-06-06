using KanbanApi.Library.DataAccess.Table;
using KanbanApi.Library.DTOs.Requests.Board;
using KanbanApi.Library.Models.Board;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Board
{
    public interface IBoard
    {
        void CreateBoard(CreateBoardRequest createBoard);
        void DeleteBaord(Guid Id);
        void UpdateBoard(UpdateBoardRequest updateBoard);
        BoardModel GetBoardById(Guid Id);
        List<BoardModel> GetBoards(Guid UserId);

        BoardModel GetBoardGroupIsMemberOff(Guid GroupId, Guid BoardId);


        void AddGroupToBoard(AddGroupToBoardRequest addGroupToBoard);
        void RemoveGroupFromBoard(RemoveGroupFromBoardRequest removeGroupFromBoard);
        void UpdateGroupRoleOnBoard(UpdateGroupRoleOnBoardRequest updateGroupRoleOnBoard);

        
    }
}
