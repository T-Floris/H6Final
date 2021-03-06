using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Group
{
    public class DeleteUserFromGroupRequest
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid GroupId { get; set; }
    }
}
