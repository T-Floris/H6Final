using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Board;
using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DataAccess.Group;
using KanbanApi.Library.DataAccess.Table;
using KanbanApi.Library.DTOs.Requests.Table;
using KanbanApi.Library.DTOs.Responses.Table;
using KanbanApi.Library.Models.Board;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KanbanApi.Controllers
{
    [Route("api/board/{boardId}/[controller]")]
    [Authorize]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly ITable _table;
        private readonly IGroup _group;
        private readonly IBoard _board;
        private readonly ApplicationDbContext _context;

        //private readonly ICard _Card;
        public TableController(ITable table, IGroup group, IBoard board, ApplicationDbContext context)
        {
            _table = table;
            _group = group;
            _board = board;
            _context = context;
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult CreateTable(Guid boardId, [FromBody] CreateTableRequest createTable)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new CreateTableResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }

                var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var groups = _group.GetAllGroupUserIsMemberOff(UserId);
                List<BoardModel> boardGroupIsMemberOff = new();

                foreach (var group in groups)
                {
                    boardGroupIsMemberOff.Add(_board.GetBoardGroupIsMemberOff(group.GroupId, boardId));
                }
                var d = _board.GetBoardById(boardId);
                createTable.BoardId = boardId;

                _table.AddTable(createTable);

                return Ok();

                

            }

            return BadRequest(new CreateTableResponse()
            {

            });
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult DeleteTable()
        {

        }

    }
}
