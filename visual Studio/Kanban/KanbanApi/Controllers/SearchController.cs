using KanbanApi.Library.DataAccess.Search;
using KanbanApi.Library.DTOs.Requests.Search;
using KanbanApi.Library.DTOs.Responses.Search;
using KanbanApi.Library.DTOs.Results.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]

    public class SearchController : ControllerBase
    {
        private readonly ISearch _search;
        public SearchController(ISearch search)
        {
            _search = search;
        }

        [HttpGet]
        [Route("SearchUser")]
        public IActionResult SearchUser([FromBody] SearchUserRequest searchUser)
        {
            if (ModelState.IsValid)
            {
                var users = _search.SearchForUser(searchUser);

                if (users.Count <= 0)
                {
                    return NotFound(new SearchUserResult()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "No user found"
                        }
                    });
                }
                return Ok(new SearchUserResult()
                {
                    Users = users,
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "list of user found by search"
                    }

                });
            }

            return BadRequest(new SearchUserResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpGet]
        [Route("SearchBoard")]
        public IActionResult SearchBoard([FromBody] SearchBoardRequest searchBoard)
        {
            if (ModelState.IsValid)
            {
                var board = _search.SearchForBoard(searchBoard);

                if (board.Count <= 0)
                {
                    return NotFound(new SearchBoardResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Error: No user found"
                        }
                    });
                }

                return Ok(new SearchBoardResult()
                {
                    Boards = board,
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "All the message found"
                    }
                });

            }

            return BadRequest(new SearchBoardResponse
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpGet]
        [Route("SearchGroup")]
        public IActionResult SearchGroup([FromBody] SearchGroupRequest searchGroup)
        {
            if (ModelState.IsValid)
            {
                var group = _search.SearchForGroup(searchGroup);

                if (group.Count <= 0)
                {
                    return NotFound(new SearchGroupResponse()
                    {

                    });
                }

                return Ok(group);

            }

            return BadRequest(new SearchGroupResponse
            {

            });

        }

        [HttpGet]
        [Route("SearchGroup/{GroupId}/User")]
        public IActionResult SearchGroupUser(Guid GroupId, [FromBody] SearchGroupUserRequest searchGroupUser)
        {
            if (ModelState.IsValid)
            {
                searchGroupUser.GroupId = GroupId;
                var groupUser = _search.SearchGroupUser(searchGroupUser);

                if (groupUser.Count <= 0)
                {
                    return NotFound(new SearchGroupUserResponse()
                    {

                    });
                }

                return Ok(groupUser);

            }

            return BadRequest(new SearchGroupUserResponse
            {

            });
        }
    }
}
