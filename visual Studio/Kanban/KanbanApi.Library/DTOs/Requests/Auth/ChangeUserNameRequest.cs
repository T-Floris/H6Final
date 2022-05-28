using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Auth
{
    public class ChangeUserNameRequest
    {
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
