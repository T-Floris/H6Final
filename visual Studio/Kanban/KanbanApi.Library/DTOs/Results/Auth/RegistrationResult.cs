using KanbanApi.Library.DTOs.Responses.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Auth
{
    public class RegistrationResult : RegistrationResponse
    {
        public List<string> Message { get; set; }
    }
}
