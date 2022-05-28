using KanbanApi.Library.Models.Group;
using KanbanApi.Library.Models.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Models.Board
{
    public class BoardModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public List<TableModel> Table { get; set; }
        //public List<GroupModel> GroupMember { get; set; }

    }
}
