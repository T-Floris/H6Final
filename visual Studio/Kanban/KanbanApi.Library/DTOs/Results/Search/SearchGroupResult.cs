using KanbanApi.Library.DTOs.Responses.Search;
using KanbanApi.Library.Models.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Search
{
    public class SearchGroupResult : SearchGroupResponse
    {
        public List<GroupModel> Groups { get; set; }
        public List<string> Message { get; set; }
    }
}
