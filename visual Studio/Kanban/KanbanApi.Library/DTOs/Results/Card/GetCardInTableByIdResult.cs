using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Card
{
    public class GetCardInTableByIdResult
    {
        public Guid BoardId { get; set; }
        public Guid CardId { get; set; }
        public Guid TableId { get; set; }
    }
}
