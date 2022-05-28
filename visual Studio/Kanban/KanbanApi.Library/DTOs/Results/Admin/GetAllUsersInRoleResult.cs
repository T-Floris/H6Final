using KanbanApi.Library.DTOs.Responses.Admin;
using KanbanApi.Library.Models.User;
using System.Collections.Generic;

namespace KanbanApi.Library.DTOs.Results.Admin
{
    public class GetAllUsersInRoleResult : GetAllUsersInRoleResponse
    {
        public List<string> Message { get; set; }
        public List<UserModel> UserInRole { get; set; }

    }
}