using KanbanApi.Library.DTOs.Requests.Search;
using KanbanApi.Library.Models.Board;
using KanbanApi.Library.Models.Group;
using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Search
{
    public interface ISearch
    {
        List<BoardModel> SearchForBoard(SearchBoardRequest searchBoard);
        List<GroupModel> SearchForGroup(SearchGroupRequest searchGroup);
        List<GroupMemberModel> SearchGroupUser(SearchGroupUserRequest searchGroupUser);
        List<UserModel> SearchForUser(SearchUserRequest searchUser);

    }
}
