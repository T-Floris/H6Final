using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.User
{
    public class SearchUserResult
    {
        public List<UserModel> Users { get; set; }
        public bool IsSuccess { get; set; }
        public List<string> Message { get; set; }
        public List<string> Errors { get; set; }

    }
}
