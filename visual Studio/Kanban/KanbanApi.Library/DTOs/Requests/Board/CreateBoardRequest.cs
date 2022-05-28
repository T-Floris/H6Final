using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Board
{
    public class CreateBoardRequest
    { 
        public Guid UserId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
