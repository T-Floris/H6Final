using KanbanApi.Library.DTOs.Responses.Board;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Board
{
    public class AddGroupToBoardResult : AddGroupToBoardResponse
    {
        public List<string> Message { get; set; }

    }
}
