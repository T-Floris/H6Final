using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Token
{
    public class TokenRevokeResult
    {
        public bool IsSuccess { get; set; }
        public List<string> Message { get; set; }
        public List<string> Errors { get; set; }
    }
}
