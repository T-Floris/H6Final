﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Requests.Board
{
    public class UpdateGroupRoleOnBoardRequest
    {
        [Required]
        public Guid GroupId { get; set; }
        [Required]
        public Guid BoardId { get; set; }
        [Required]
        public Guid BoardAccessId { get; set; }
    }
}