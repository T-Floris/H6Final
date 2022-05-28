using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Models.Group
{
    public class GroupModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string GroupName { get; set; }
        public string Color { get; set; }
        public GroupMemberModel GroupMembers { get; set; }
    }
}
