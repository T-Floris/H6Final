using KanbanApi.Library.DTOs.Results.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Responses.Auth
{
    public class ChangeUserNameResponse : ChangeUserNameResult
    {
        public List<string> Errors { get; set; }

    }
}
