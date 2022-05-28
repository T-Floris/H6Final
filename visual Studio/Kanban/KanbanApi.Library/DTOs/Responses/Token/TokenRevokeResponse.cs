using KanbanApi.Library.DTOs.Results.Token;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Responses.Token
{
    public class TokenRevokeResponse : TokenRevokeResult
    {
        public bool IsSuccess { get; set; }
        public List<string> Errors { get; set; }

    }
}
