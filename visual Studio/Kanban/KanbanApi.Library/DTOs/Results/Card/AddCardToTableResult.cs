using KanbanApi.Library.DTOs.Responses.Card;
using KanbanApi.Library.Models.Card;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Card
{
    public class AddCardToTableResult : AddCardToTableResponse
    {
        public List<string> Message { get; set; }
        public CardModel Card { get; set; }
    }
}
