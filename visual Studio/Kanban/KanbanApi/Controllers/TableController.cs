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
        //private readonly ICard _Card;
        public TableController(ITable table, IGroup group, IBoard board)
        {
            _table = table;
            _group = group;
            _board = board;
        }

        [HttpGet]
        [Route("Create")]
        public IActionResult CreateTable(Guid boardId, [FromBody] CreateTableRequest createTable)
        {
            if (ModelState.IsValid)
            {

                var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var groups = _group.GetAllGroupUserIsMemberOff(UserId);

                List<BoardModel> dds = new List<BoardModel>();

                foreach (var group in groups)
                {
                    dds.Add(_board.GetBoardGroupIsMemberOff(group.GroupId, boardId));
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



    }
}
