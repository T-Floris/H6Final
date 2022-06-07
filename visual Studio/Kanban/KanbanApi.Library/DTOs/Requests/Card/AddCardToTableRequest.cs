using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Card
{
    public class AddCardToTableRequest
    {
        public Guid BoardId { get; set; }
        public Guid TableId { get; set; }
        [Required]
        public string Info { get; set; }
    }
}
