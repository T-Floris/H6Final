using KanbanApi.Library.DTOs.Responses.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Admin
{
    public class UpdateUserResult : UpdateUserResponse
    {
        public List<string> Message { get; set; }

    }
}
