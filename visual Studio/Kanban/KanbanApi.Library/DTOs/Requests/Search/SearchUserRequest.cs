using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Search
{
    public class SearchUserRequest
    {        
        public string UserName { get; set; }
    }
}
