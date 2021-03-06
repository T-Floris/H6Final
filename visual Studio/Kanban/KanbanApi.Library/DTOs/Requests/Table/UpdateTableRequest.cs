using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Table
{
    public class UpdateTableRequest
    {
        
        public Guid BoardId { get; set; }
        
        public Guid TableId { get; set; }
        [Required]
        public string Name { get; set; }


    }
}
