using KanbanApi.Library.DTOs.Responses.Admin;
using KanbanApi.Library.Models.GroupAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Admin
{
    public class CreateGroupAccessResult : CreateGroupAccessResponse
    {
        public List<string> Message { get; set; }
        public GroupAccessModel GroupAccess { get; set; }
    }
}
