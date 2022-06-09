using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Group
{
    public class UpdateUserGroupRoleRequest
    {
        public Guid GroupId { get; set; }
        public Guid UserId { get; set; }
        public Guid GroupAccessId { get; set; }
    }
}
