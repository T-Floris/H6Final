using KanbanApi.Library.DTOs.Responses.Search;
using KanbanApi.Library.Models.Board;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Search
{
    public class SearchBoardResult : SearchBoardResponse
    {
        public List<BoardModel> Boards { get; set; }
        public List<string> Message { get; set; }
    }
}
