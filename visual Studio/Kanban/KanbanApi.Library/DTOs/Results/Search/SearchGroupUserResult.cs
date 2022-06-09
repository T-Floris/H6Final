using KanbanApi.Library.DTOs.Responses.Search;
using KanbanApi.Library.Models.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Search
{
    public class SearchGroupUserResult : SearchGroupUserResponse
    {
        public List<GroupMemberModel> groupMember { get; set; }
    }
}
