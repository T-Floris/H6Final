using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Group;
using KanbanApi.Library.DTOs.Requests.Group;
using KanbanApi.Library.DTOs.Responses.Group;
using KanbanApi.Library.DTOs.Results.Group;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroup _group;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public GroupController(IGroup group, ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _group = group;
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult CreateGroup([FromBody] CreateGroupRequest createGroup)
        {
            if (ModelState.IsValid)
            {
                createGroup.UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));


                _group.CreateGroup(createGroup);

                return Ok(new CreateGroupResult()
                {
                    Message = new List<string>()
                    {
                        "Group is created"
                    }
                });



            }

            return BadRequest(new CreateGroupResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpPost]
        [Route("AddUser/group/{groupId}/user/{selectUserId}/GroupAccess/{groupAccessId}")]
        public IActionResult AddUserToGroup(Guid groupId, Guid selectUserId, Guid groupAccessId)
        {
            var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var groupAccess = _group.CheckUserAccess(groupId, UserId);
            
            if (!groupAccess)
            {
                return Unauthorized(new AddUserToGroupResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>()
                    {
                        "Unauthorized"
                    }
                });
            }

            AddUserToGroupRequest addUserToGroup = new()
            {
                GroupId = groupId,
                UserId = selectUserId,
                GroupAccessId = groupAccessId
            };

            if (TryValidateModel(addUserToGroup))
            {
                _group.AddUserToGroup(addUserToGroup);

                return Ok(new AddUserToGroupResult()
                {
                    IsSuccess = false,
                    Message = new List<string>()
                    {
                        "User has ben add'et to group"
                    }
                });
            }

            return BadRequest(new AddUserToGroupResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });
        }

        [HttpPut]
        [Route("UpdateAccess/group/{groupId}/user/{selectUserId}/GroupAccess/{groupAccessId}")]
        public IActionResult UpdateUserAccess(Guid groupId, Guid selectUserId, Guid groupAccessId)
        {
            var groupAccess = CheckUserAccess(groupId);

            if (!groupAccess)
            {
                return Unauthorized(new AddUserToGroupResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>()
                    {
                        "Unauthorized"
                    }
                });
            }
            UpdateUserGroupRoleRequest updateUserGroupRole = new()
            {
                GroupAccessId = groupAccessId,
                GroupId = groupId,
                UserId = selectUserId,
            };

            _group.UpdateUserGroupRole(updateUserGroupRole);

            //var dd = _group.GetAllGroupUserIsMemberOff(selectUserId);

            
            

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteUser/group/{groupId}/user/{userId}")]
        public IActionResult DeleteUserFromGroup(Guid groupId, Guid userId)
        {

            var user = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var groupAccess = _group.CheckUserAccess(groupId, user);

            if (!groupAccess)
            {
                if (userId != user)
                {
                    return Unauthorized(new DeleteUserFromGroupResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Unauthorized"
                        }
                    });
                }
            }

            DeleteUserFromGroupRequest addUserToGroup = new()
            {
                GroupId = groupId,
                UserId = userId
            };

            if (TryValidateModel(addUserToGroup))
            {
                _group.DeleteUserFromGroup(addUserToGroup);

                return Ok(new DeleteUserFromGroupResult()
                {
                    Message = new List<string>()
                    {
                        "User has ben removed from group"
                    }

                });

            }

            return BadRequest(new DeleteUserFromGroupResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }
            });

        }

        [HttpGet]
        [Route("Get/{groupId}")]
        public IActionResult GetGroupById(Guid groupId)
        {
            var group = _group.GetGroupById(groupId);
            

            return Ok(new GetGroupByIdResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "Get group by id"
                },
                Group = group
                
            });
        }
        
        [HttpGet]
        [Route("Get")]
        public IActionResult GetGroups()
        {
            var group = _group.GetAllGroups();


            return Ok(new GetGroupsResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "All Groups"
                },
                Group = group

            });

        }

        [HttpGet]
        [Route("Get/Owner/{userId}")]
        public IActionResult GetGroupsByOwner(Guid userId)
        {
            var GroupsByOwner = _group.GetAllGroupsByOwner(userId);

            return Ok(new GetGroupsResult()
            {
                IsSuccess = true,
                Message= new List<string>()
                {
                    "all users group"
                },
                Group= GroupsByOwner

            });

            //return Unauthorized();
        }


        private bool CheckUserAccess(Guid groupId)
        {
            var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var groupAccess = _group.CheckUserAccess(groupId, UserId);
            return groupAccess;

        }
    }
}
