using KanbanApi.Library.DTOs.Responses.Table;
using KanbanApi.Library.Models.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Table
{
    public class GetSelectedTableResult : GetSelectedTableResponse
    {
        public List<string> Message { get; set; }
        public TableModel Table { get; set; }

    }
}
