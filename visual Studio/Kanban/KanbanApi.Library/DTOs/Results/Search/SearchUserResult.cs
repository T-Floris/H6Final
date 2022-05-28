using KanbanApi.Library.DTOs.Responses.Search;
using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Search
{
    public class SearchUserResult : SearchUserResponse
    {
        public List<UserModel> Users { get; set; }
        public List<string> Message { get; set; }

    }
}
