﻿using KanbanApi.Library.DTOs.Responses.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Table
{
    public class CreateTableResult : CreateTableResponse
    {
        public List<string> Message { get; set; }
    }
}
