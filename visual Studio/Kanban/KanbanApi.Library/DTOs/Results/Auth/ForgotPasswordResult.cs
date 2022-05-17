using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Auth
{
    public class ForgotPasswordResult
    {
        public string EmailAddress { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public string Errors { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
    }
}
