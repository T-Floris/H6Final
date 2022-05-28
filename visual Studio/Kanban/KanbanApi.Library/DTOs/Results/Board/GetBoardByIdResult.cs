﻿using KanbanApi.Library.DTOs.Responses.Board;
using KanbanApi.Library.Models.Board;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Board
{
    public class GetBoardByIdResult : GetBoardByIdResponse
    {
        public BoardModel Board { get; set; }
        public List<string> Message { get; set; }


    }
}
