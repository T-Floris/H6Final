using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Admin
{
    public class CreateGroupAccessRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
