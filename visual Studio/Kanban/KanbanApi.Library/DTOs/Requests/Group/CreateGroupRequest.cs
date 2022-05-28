using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Group
{
    public class CreateGroupRequest
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

    }
}
