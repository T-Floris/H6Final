using KanbanApi.Library.DTOs.Responses.Admin;
using KanbanApi.Library.Models.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Admin
{
    public class GetAllUsersResult : GetAllUsersResponse
    {
        public List<string> Message { get; set; }

        //public List<UserModel> Users { get; set; }
        public List<UserModel> Admin { get; set; }
        public List<UserModel> User { get; set; }
        public List<UserModel> Enterprise { get; set; }
        public List<UserModel> Standard { get; set; }
        public List<UserModel> Premium { get; set; }

    }
}
