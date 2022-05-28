using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Models.Group
{
    public class GroupMemberModel
    {
        //public string UserName { get; set; }
        //public string GroupName { get; set; }
        //public string AccessName { get; set; }
        public List<OwnerModel> Owner { get; set; }
        public List<AdminModel> Admin { get; set; }
        public List<UsersModel> User { get; set; }



    }
}
