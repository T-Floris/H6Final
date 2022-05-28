using KanbanApi.Library.DTOs.Responses.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Auth
{
    public class ForgotPasswordResult : ForgotPasswordResponse
    {
        public string EmailAddress { get; set; }
        public Guid UserId { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }
}
