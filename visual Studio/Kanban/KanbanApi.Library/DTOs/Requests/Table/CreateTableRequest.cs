using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Table
{
    public class CreateTableRequest
    {
        public Guid BoardId { get; set; }
        public string Name { get; set; }
    }
}
