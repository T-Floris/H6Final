using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Auth
{
    public class ChangeEmailRequest
    {
        //[Required]
        public string UserId { get; set; }
        [Required]
        [EmailAddress]
        public string NewEmailAddress { get; set; }
    }
}
