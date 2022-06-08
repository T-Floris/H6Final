using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Card
{
    public class MoveCardFromTableRequest
    {
        [Required]
        public Guid BoardId { get; set; }
        [Required]
        public Guid TableId { get; set; }
        [Required]
        public Guid CardId { get; set; }
        [Required]
        public Guid NewTableId { get; set; }
        [Required]
        public int NewPosition { get; set; }
    }
}
