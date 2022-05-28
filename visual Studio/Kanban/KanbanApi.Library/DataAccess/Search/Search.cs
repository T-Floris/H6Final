using KanbanApi.Library.DTOs.Requests.Search;
using KanbanApi.Library.Internal.DataAccess;
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
    public class Search : ISearch
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";

        public Search(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public List<BoardModel> SearchForBoard(SearchBoardRequest searchBoard)
        {
            var output = _sql.LoadData<BoardModel, dynamic>("dbo.spSearch_Board", new { }, DatabaseName);
            return output;
        }

        public List<GroupModel> SearchForGroup(SearchGroupRequest searchGroup)
        {
            var output = _sql.LoadData<GroupModel, dynamic>("dbo.spSearch_Group", new { searchGroup.GroupName }, DatabaseName);
            return output;
        }

        public List<UserModel> SearchForUser(SearchUserRequest searchUser)
        {
            var output = _sql.LoadData<UserModel, dynamic>("dbo.spSearch_User", new { searchUser.UserName }, DatabaseName);
            return output;
        }

        public List<GroupMemberModel> SearchGroupUser(SearchGroupUserRequest searchGroupUser)
        {
            var output = _sql.LoadData<GroupMemberModel, dynamic>("dbo.spSearch_GroupUser", new { }, DatabaseName);
            return output;
        }
    }
}
