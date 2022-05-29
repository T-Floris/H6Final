using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Board;
using KanbanApi.Library.DTOs.Requests.Board;
using KanbanApi.Library.DTOs.Responses.Board;
using KanbanApi.Library.DTOs.Results.Board;
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
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;


        public BoardController(IBoard board, ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _board = board;
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

            var boards = _board.GetBoards();

            return Ok(new GetBoardResult()
            {
                IsSuccess= true,
                Message= new List<string>()
                {
                    "get all boards"
                },
                Boards = boards
            });
        }

        [HttpGet]
        [Route("GetBoard/{Id}")]
        public IActionResult GetBoardById(Guid Id)
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

            var board = _board.GetBoardById(Id);

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
        [Route("AddGroup/{boardId}/Group/{selectGroupId}/BoardAccess/{boardAccessId}")]
        public IActionResult AddGroupToBoard(Guid boardId, Guid selectGroupId, Guid boardAccessId/*, [FromBody] AddGroupToBoardRequest addGroupToBoard*/)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new AddGroupToBoardResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            AddGroupToBoardRequest addGroupToBoard = new()
            {
                BoardId = boardId,
                BoardAccessId = boardAccessId,
                GroupId = selectGroupId,
            };
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
        [Route("RemoveGroup/{boardId}/Group/{selectGroupId}")]
        public IActionResult RemoveGroupFromBoard(Guid boardId, Guid selectGroupId/*, [FromBody] RemoveGroupFromBoardRequest removeGroupFromBoard*/)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new RemoveGroupFromBoardResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
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
        [Route("UpdateGroup/{boardId}/Group/{selectGroupId}/BoardAccess/{boardAccessId}")]
        public IActionResult UpdateGroupRoleOnBoard(Guid boardId, Guid selectGroupId, Guid boardAccessId/*, [FromBody] UpdateGroupRoleOnBoardRequest updateGroupRoleOnBoard*/)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new UpdateGroupRoleOnBoardResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            UpdateGroupRoleOnBoardRequest updateGroupRoleOnBoard = new()
            {
                BoardId = boardId,
                GroupId = selectGroupId,
                BoardAccessId = boardAccessId
            };


            if (TryValidateModel(updateGroupRoleOnBoard))
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
