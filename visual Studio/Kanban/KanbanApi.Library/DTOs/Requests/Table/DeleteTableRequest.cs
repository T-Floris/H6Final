using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Table
{
    public class DeleteTableRequest
    {
        [Required]
        public Guid BoardId { get; set; }
        [Required]
        public Guid TableId { get; set; }
    }
}
