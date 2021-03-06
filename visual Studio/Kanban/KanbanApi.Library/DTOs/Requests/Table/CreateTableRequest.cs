using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Table
{
    public class CreateTableRequest
    {
        public Guid BoardId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
