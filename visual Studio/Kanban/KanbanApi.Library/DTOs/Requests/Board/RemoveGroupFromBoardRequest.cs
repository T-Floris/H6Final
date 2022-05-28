using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Board
{
    public class RemoveGroupFromBoardRequest
    {
        [Required]
        public Guid GroupId { get; set; }
        [Required]
        public Guid BoardId { get; set; }

    }
}
