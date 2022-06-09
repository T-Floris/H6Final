using KanbanApi.Library.DTOs.Requests.Group;
using KanbanApi.Library.Models.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Group
{
    public interface IGroup
    {
        void CreateGroup(CreateGroupRequest createBoard);
        List<GroupModel> GetAllGroups();
        GroupModel GetGroupById(Guid groupId);

        List<GroupModel> GetAllGroupsByOwner(Guid userId);

        List<GroupMemberOffModel> GetAllGroupUserIsMemberOff(Guid userId);

        bool IsMemberOff(Guid groupId, Guid userId);

        public bool CheckUserAccess(Guid groupId, Guid userId);

        void AddUserToGroup(AddUserToGroupRequest addUserToGroup);
        void DeleteUserFromGroup(DeleteUserFromGroupRequest deleteUserFromGroup);
        void UpdateUserGroupRole(UpdateUserGroupRoleRequest updateUserGroupRole);
    }
}
