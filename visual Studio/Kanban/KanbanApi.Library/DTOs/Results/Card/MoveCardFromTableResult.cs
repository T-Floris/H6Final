using KanbanApi.Library.DTOs.Responses.Card;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Card
{
    public class MoveCardFromTableResult : MoveCardFromTableResponse
    {
        public List<string> Message { get; set; }
    }
}
