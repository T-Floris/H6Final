using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Responses.Group
{
    public class AddUserToGroupResponse
    {
        public bool IsSuccess { get; set; }
        public List<string> Errors { get; set; }

    }
}
