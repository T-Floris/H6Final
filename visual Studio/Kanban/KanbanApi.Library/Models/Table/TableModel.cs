using KanbanApi.Library.Models.Card;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Models.Table
{
    public class TableModel
    {
        public Guid TableId { get; set; }
        public string Name { get; set; }
        public List<CardModel> Card { get; set; }
    }
}
