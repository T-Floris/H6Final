using KanbanApi.Library.DTOs.Responses.Group;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Group
{
    public class CreateGroupResult : CreateGroupResponse
    {
        public List<string> Message { get; set; }

    }
}
