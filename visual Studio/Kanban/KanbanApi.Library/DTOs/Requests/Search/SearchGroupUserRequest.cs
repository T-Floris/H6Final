using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Search
{
    public class SearchGroupUserRequest
    {
        public Guid GroupId { get; set; }
        public string UserName { get; set; }
    }
}
