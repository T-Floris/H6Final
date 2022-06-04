using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Auth
{
    public class DeleteUserRequest
    {
        [Required]
        //[Range(typeof(bool), "true", "true", ErrorMessage = "User not deleted")]
        public bool ToDelete { get; set; }

        public string UserId { get; set; }
    }

}
