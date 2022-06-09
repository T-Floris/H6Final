using KanbanApi.Library.DataAccess.Board;
using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DataAccess.Group;
using KanbanApi.Library.DataAccess.Table;
using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.DTOs.Requests.Table;
using KanbanApi.Library.DTOs.Responses.Table;
using KanbanApi.Library.DTOs.Results.Table;
using KanbanApi.Library.Models.Board;
using KanbanApi.Library.Models.Table;
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
        private readonly ICard _card;
        //private readonly ICard _Card;
        public TableController(ITable table, IGroup group, IBoard board, ICard card)
        {
            _table = table;
            _group = group;
            _board = board;
            _card = card;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult GetAllTablesOnBoard(Guid boardId)
        {
            List<TableModel> tableList = _table.GetAllTablesOnBoard(boardId);

            foreach (var table in tableList)
            {
                GetCardsInTableRequest getCardInTable = new()
                {
                    BoardId = boardId,
                    TableId = table.TableId
                };

                table.Card = _card.GetAllInTable(getCardInTable);
                
            }

            return Ok(new GetAllTablesResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "success"
                },
                Tables = tableList
            });
        }


        [HttpGet]
        [Route("Get/{tableId}")]
        public IActionResult GetSelectedTableOnBoard(Guid boardId, Guid tableId)
        {
            TableModel table = _table.GetSelectedTableOnBoard(boardId, tableId);

            GetCardsInTableRequest getCardInTable = new()
            {
                BoardId = boardId,
                TableId = table.TableId
            };

            table.Card = _card.GetAllInTable(getCardInTable);

            return Ok(new GetSelectedTableResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "success"
                },
                Table = table
            });

            return BadRequest(new GetSelectedTableResult()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpPost]
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

                //_board.GetBoardGroupIsMemberOff(GroupId)

                //var d = _board.GetBoardById(boardId);
                //createTable.BoardId = boardId;
                createTable.BoardId = boardId;
                

                var tableId = _table.AddTable(createTable);

                return Ok(new CreateTableResult()
                {
                    IsSuccess = true,
                    TableId = tableId.TableId
                });

                

            }

            return BadRequest(new CreateTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpPut]
        [Route("update/{tableId}")]
        public IActionResult UpdateTable(Guid boardId, Guid tableId, [FromBody] UpdateTableRequest updateTable)
        {
            updateTable.BoardId = boardId;
            updateTable.TableId = tableId;

            if (TryValidateModel(updateTable))
            {
                _table.UpdateTable(updateTable);

                return Ok(new UpdateTableResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "table name has ben updated"
                    }
                });

            }

            return BadRequest(new UpdateTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpPut]
        [Route("Move/{tableId}")]
        public IActionResult MoveTable(Guid boardId, Guid tableId, [FromBody] MoveTableRequest moveTable)
        {
            moveTable.BoardId = boardId;
            moveTable.TableId = tableId;

            if (TryValidateModel(moveTable))
            {
                _table.MoveTable(moveTable);

                return Ok(new MoveTableResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Table has ben moved"
                    }
                });

            }

            return Ok();

            return BadRequest(new MoveTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpDelete]
        [Route("Delete/{tableId}")]
        public IActionResult CreateTable(Guid boardId, Guid tableId)
        {
            DeleteTableRequest deleteTable = new DeleteTableRequest();

            deleteTable.BoardId = boardId;
            deleteTable.TableId = tableId;
            
            if(TryValidateModel(deleteTable))
            {
                _table.DeleteTable(deleteTable);

                return Ok(new DeleteTableResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "delete"
                    }
                });
            }

            return BadRequest(new DeleteTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

    }
}
