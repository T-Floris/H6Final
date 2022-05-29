using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Group
{
    public class UpdateUserRoleOnGroupRequist
    {
        [Required]
        public Guid GroupId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid GroupAccessId { get; set; }
    }
}
