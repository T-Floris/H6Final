using KanbanApi.Library.DTOs.Requests.Group;
using KanbanApi.Library.Internal.DataAccess;
using KanbanApi.Library.Models.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Group
{
    public class Group : IGroup
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";

        public Group(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public void AddUserToGroup(AddUserToGroupRequest addUserToGroup)
        {
            _sql.SaveData("spGroupUser_AddUser", new { addUserToGroup.UserId, addUserToGroup.GroupId, addUserToGroup.GroupAccessId }, DatabaseName);
        }

        public void CreateGroup(CreateGroupRequest createBoard)
        {
            _sql.SaveData("spGroup_Create", new { createBoard.UserId, createBoard.Name, createBoard.Color }, DatabaseName);
        }

        public List<GroupModel> GetAllGroups()
        {            
            var data = _sql.LoadData<GroupModel, dynamic>("spGroup_GetAll", new {  }, DatabaseName);

            foreach (var group in data)
            {
                var owner = _sql.LoadData<OwnerModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "owner").ToList();
                var admin = _sql.LoadData<AdminModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "admin").ToList();
                var user = _sql.LoadData<UsersModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "user").ToList();
                
                GroupMemberModel groupMembers = new()
                {
                    Admin = admin,
                    Owner = owner,
                    User = user,                    
                };

                group.GroupMembers = groupMembers;
            }

            return data;
        }

        public GroupModel GetGroupById(Guid groupId)
        {
            var data = _sql.LoadData<GroupModel, dynamic>("spGroup_Select", new { groupId }, DatabaseName).FirstOrDefault();
            if (data == null)
                return null;

            var owner = _sql.LoadData<OwnerModel, dynamic>("spGroupUser_GetInGroup", new { data.Id }, DatabaseName).Where(s => s.AccessName == "owner").ToList();
            var admin = _sql.LoadData<AdminModel, dynamic>("spGroupUser_GetInGroup", new { data.Id }, DatabaseName).Where(s => s.AccessName == "Admin").ToList();
            var user = _sql.LoadData<UsersModel, dynamic>("spGroupUser_GetInGroup", new { data.Id }, DatabaseName).Where(s => s.AccessName == "user").ToList();
           
            GroupMemberModel groupMembers = new()
            {
                Admin = admin,
                Owner = owner,
                User = user
            };

            data.GroupMembers = groupMembers;

            return data;
        }

        public bool CheckUserAccess(Guid groupId, Guid userId)
        {
            var hasAccess = _sql.LoadData<bool, dynamic>("spGroupUser_HasAccess", new { groupId, userId }, DatabaseName).FirstOrDefault();
            return hasAccess;
        }

        public void DeleteUserFromGroup(DeleteUserFromGroupRequest deleteUserFromGroup)
        {
            _sql.DeleteData("spGroupUser_RemoveUser", new { deleteUserFromGroup.UserId, deleteUserFromGroup.GroupId }, DatabaseName);
        }

        public List<GroupModel> GetAllGroupsByOwner(Guid userId)
        {
            var data = _sql.LoadData<GroupModel, dynamic>("spGroup_GetAllByOwner", new { userId }, DatabaseName);

            foreach (var group in data)
            {
                var owner = _sql.LoadData<OwnerModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "owner").ToList();
                var admin = _sql.LoadData<AdminModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "admin").ToList();
                var user = _sql.LoadData<UsersModel, dynamic>("spGroupUser_GetInGroup", new { group.Id }, DatabaseName).Where(s => s.AccessName == "user").ToList();

                GroupMemberModel groupMembers = new()
                {
                    Admin = admin,
                    Owner = owner,
                    User = user,
                };

                group.GroupMembers = groupMembers;
            }


            return data;
        }

        public List<GroupMemberOffModel> GetAllGroupUserIsMemberOff(Guid userId)
        {
            var groupMember = _sql.LoadData<GroupMemberOffModel, dynamic>("spGroupUser_MemberOff", new { userId }, DatabaseName);
            return groupMember;
        }

        public bool IsMemberOff(Guid groupId, Guid userId)
        {
            bool isMemberOff = _sql.LoadData<bool, dynamic>("spGroupUser_IsMemberOff", new { groupId, userId }, DatabaseName).FirstOrDefault();
            return isMemberOff;
        }

        public void UpdateUserInGroup(UpdateUserRoleOnGroupRequist updateUserRoleOnGroup)
        {
            throw new NotImplementedException();
        }
    }
}
