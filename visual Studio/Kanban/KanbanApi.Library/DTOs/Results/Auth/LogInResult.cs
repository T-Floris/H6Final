using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Auth
{
    public class LogInResult
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool IsSuccess { get; set; }
        public List<string> Roles { get; set; }
        public List<string> Message { get; set; }
        public List<string> Errors { get; set; }
    }
}
