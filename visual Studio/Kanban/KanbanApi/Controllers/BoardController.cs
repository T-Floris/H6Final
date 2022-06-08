using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Board;
using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DataAccess.Group;
using KanbanApi.Library.DataAccess.Table;
using KanbanApi.Library.DTOs.Requests.Board;
using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.DTOs.Responses.Board;
using KanbanApi.Library.DTOs.Results.Board;
using KanbanApi.Library.Models.Board;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly IBoard _board;
        private readonly ITable _table;
        private readonly ICard _card;
        private readonly IGroup _group;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;


        public BoardController(IBoard board, ITable table, ICard card, IGroup group, ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _board = board;
            _table = table;
            _card = card;
            _group = group;

            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult CreateBoard([FromBody] CreateBoardRequest createBoard)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new CreateBoardResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }

                createBoard.UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)); 


                _board.CreateBoard(createBoard);

                return Ok(new CreateBoardResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Board Is Created"
                    }

                });
            }

            return BadRequest(new CreateBoardResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpDelete]
        [Route("Delete/{Id}")]
        public IActionResult DeleteBoard(Guid Id)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new DeleteBoardResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                _board.DeleteBaord(Id);

                return Ok(new DeleteBoardResult()
                {
                    
                });
            }

            return BadRequest(new CreateBoardResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });

        }

        [HttpPut]
        [Route("Update/{Id}")]
        public IActionResult UpdateBoard(Guid Id, [FromBody] UpdateBoardRequest updateBoard)
        {
            
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new UpdateBoardResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                
                updateBoard.Id = Id;
                _board.UpdateBoard(updateBoard);

                return Ok(new UpdateBoardResult()
                {

                });
            }

            return BadRequest(new UpdateBoardResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });

        }

        [HttpGet]
        [Route("GetBoards")]
        public IActionResult GetBoard()
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetBoardResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            List<BoardModel> boardList = _board.GetBoards(UserId);

            foreach (var board in boardList)
            {
                board.Table = _table.GetAllTablesOnBoard(board.Id);

                foreach (var table in board.Table)
                {
                    GetCardsInTableRequest getCardsInTable = new()
                    {
                        BoardId = board.Id,
                        TableId = table.TableId
                    };

                    table.Card = _card.GetAllInTable(getCardsInTable);


                }
            }

            //var tables = _table.

            return Ok(new GetBoardResult()
            {
                IsSuccess= true,
                Message= new List<string>()
                {
                    "get all boards"
                },
                Boards = boardList
            });
        }

        [HttpGet]
        [Route("GetBoards/{BoardId}")]
        public IActionResult GetBoardById(Guid BoardId)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetBoardResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var board = _board.GetBoardById(UserId, BoardId);

            board.Table = _table.GetAllTablesOnBoard(board.Id);

            foreach (var table in board.Table)
            {
                GetCardsInTableRequest getCardsInTable = new()
                {
                    BoardId = board.Id,
                    TableId = table.TableId
                };

                table.Card = _card.GetAllInTable(getCardsInTable);


            }


            return Ok(new GetBoardByIdResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    ""
                },
                Board = board
            });
            //return Ok(new GetBoardResult()
            //{
            //    Board = board
            //});

        }



        [HttpGet]
        [Route("{boardId}/AddGroup/{selectGroupId}")]
        public IActionResult AddGroupToBoard(Guid boardId, Guid selectGroupId, /*Guid BoardAccessId, */[FromBody] AddGroupToBoardRequest addGroupToBoard)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var board = _board.GetBoardById(userId, boardId);

            if (board == null)
            {
                var canAdd = _group.CheckUserAccess(selectGroupId, userId);

                if (!canAdd)
                    return BadRequest(new AddGroupToBoardResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                    {
                        "you do not have access to 'remove group'"
                    }
                    });

            }

            addGroupToBoard.BoardId = boardId;

            addGroupToBoard.GroupId = selectGroupId; 
            //AddGroupToBoardRequest addGroupToBoard = new()
            //{
            //    BoardId = boardId,
            //    BoardAccessId = BoardAccessId,
            //    GroupId = selectGroupId,
            //};
            if (TryValidateModel(addGroupToBoard))
            {
                addGroupToBoard.BoardId = boardId;

                _board.AddGroupToBoard(addGroupToBoard);

                return Ok(new AddGroupToBoardResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Group add'et to board"
                    }
                });

            }

            return BadRequest(new AddGroupToBoardResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpDelete]
        [Route("{boardId}/RemoveGroup/Group/{selectGroupId}")]
        public IActionResult RemoveGroupFromBoard(Guid boardId, Guid selectGroupId/*, [FromBody] RemoveGroupFromBoardRequest removeGroupFromBoard*/)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var board =  _board.GetBoardById(userId, boardId);
            
            if (board == null)
            {
                var groupAccess = _group.CheckUserAccess(selectGroupId, userId);

                if (!groupAccess)
                    return BadRequest(new RemoveGroupFromBoardResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                    {
                        "you do not have access to 'remove group'"
                    }
                    });
            }



            RemoveGroupFromBoardRequest removeGroupFromBoard = new()
            {
                BoardId = boardId,
                GroupId = selectGroupId
            };
            if (ModelState.IsValid)
            {
                _board.RemoveGroupFromBoard(removeGroupFromBoard);

                return Ok(new RemoveGroupFromBoardResult()
                {
                    IsSuccess = true,
                    Message=new List<string>()
                    {
                        "Group removed from board"
                    }
                });
            }

            return BadRequest(new RemoveGroupFromBoardResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });

        }

        [HttpPut]
        [Route("{boardId}/UpdateGroup/Group/{selectGroupId}")]
        public IActionResult UpdateGroupRoleOnBoard(Guid boardId, Guid selectGroupId, Guid BoardAccessId, [FromBody] UpdateGroupRoleOnBoardRequest updateGroupRoleOnBoard)
        {
            if (ModelState.IsValid)
            {
                _board.UpdateGroupRoleOnBoard(updateGroupRoleOnBoard);

                return Ok(new UpdateGroupRoleOnBoardResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Update groups role on board"
                    }
                });

            }

            return BadRequest(new UpdateGroupRoleOnBoardResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

    }
}
