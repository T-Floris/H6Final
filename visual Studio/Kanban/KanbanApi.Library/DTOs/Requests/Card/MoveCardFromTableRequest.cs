﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Card
{
    public class MoveCardFromTableRequest
    {
        public Guid TableId { get; set; }
        public Guid CardId { get; set; }
    }
}
