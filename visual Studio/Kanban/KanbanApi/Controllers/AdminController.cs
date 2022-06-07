using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Admin;
using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.DTOs.Requests.Admin;
using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Responses.Admin;
using KanbanApi.Library.DTOs.Responses.Auth;
using KanbanApi.Library.DTOs.Results.Admin;
using KanbanApi.Library.DTOs.Results.Auth;
using KanbanApi.Library.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUserData _userData;
        private readonly IAdmin _admin;
        private readonly IConfiguration _config;

        public AdminController(ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IUserData userData, IAdmin admin, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _userData = userData;
            _admin = admin;
            _config = config;
        }

        //[HttpGet]
        //[Route("GetUsers")]
        //public IActionResult GetUsers()
        //{
        //    var canConnect = _context.Database.CanConnect();
        //    if (!canConnect)
        //    {
        //        return BadRequest(new GetAllUsersResponse()
        //        {
        //            Errors = new List<string>()
        //            {
        //                "can't reach the server"
        //            }
        //        });
        //    }

        //    var users = _admin.GetAllUsers();
            
        //    return Ok(new GetAllUsersResult() 
        //    {

        //        Users = users
        //    });
        //}

        [HttpGet]
        [Route("Users/Get")]
        public async Task<IActionResult> GetUsersInRole()
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }
            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
            bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
            if (!isInRole)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                });
            }

            var admins = _userManager.GetUsersInRoleAsync("Admin").Result;
            var Users = _userManager.GetUsersInRoleAsync("User").Result;
            var Enterprises = _userManager.GetUsersInRoleAsync("Enterprise").Result;
            var Standards = _userManager.GetUsersInRoleAsync("Standard").Result;
            var Premiums = _userManager.GetUsersInRoleAsync("Premium").Result;


            List<UserModel> adminlist = new List<UserModel>();
            List<UserModel> userlist = new List<UserModel>();
            List<UserModel> enterpriselist = new List<UserModel>();
            List<UserModel> standardlist = new List<UserModel>();
            List<UserModel> premiumlist = new List<UserModel>();

            foreach (var user in admins)
            {
                var usermodel = _userData.GetUserById(user.Id);
                adminlist.Add(usermodel);
            }

            foreach (var user in Users)
            {
                var usermodel = _userData.GetUserById(user.Id);
                userlist.Add(usermodel);
            }

            foreach (var user in Enterprises)
            {
                var usermodel = _userData.GetUserById(user.Id);
                enterpriselist.Add(usermodel);
            }

            foreach (var user in Standards)
            {
                var usermodel = _userData.GetUserById(user.Id);
                standardlist.Add(usermodel);
            }

            foreach (var user in Premiums)
            {
                var usermodel = _userData.GetUserById(user.Id);
                premiumlist.Add(usermodel);
            }

            return Ok(new GetAllUsersResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "All users in grups"
                },
                Admin = adminlist,
                User = userlist,
                Enterprise = enterpriselist,
                Standard = standardlist,
                Premium = premiumlist
            });;
        }

        [HttpDelete]
        [Route("delete/user/{userId}")]
        public async Task<IActionResult> Delete(string userId, [FromBody] DeleteUserRequest deleteUser)
        {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new DeleteUserResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                /// find logged in user

                /// make sure the user wont to delet thery acount
                if (true)
                {
                    /// find user by id
                    deleteUser.UserId = userId;
                    IdentityUser user = await _userManager.FindByIdAsync(userId);

                    /// null check
                    if (user is null)
                    {
                        return NotFound(new DeleteUserResponse
                        {
                            Errors = new List<string>()
                            {
                                $"user whit id: { userId } no found"
                            },
                            IsSuccess = false
                        });

                    }

                    /// Delete user
                    var f = await _userManager.DeleteAsync(user);
                    /// Delete user
                    try
                    {
                        //_userData.DeleteUser(deleteUser);

                    }
                    catch (Exception)
                    {


                    }
                    /// return Success message
                    return Ok(new DeleteUserResult()
                    {
                        IsSuccess = true,
                        Message = $"the user is deletet"
                    });
                }

            }

        [HttpPut]
        [Route("update/user/{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UpdateUserRequest updateUser)
        {
            if (ModelState.IsValid)
            {

                IdentityUser user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                return NotFound(new ChangeUserNameResponse()
                {
                    IsSuccess = false,
                    Errors = { "User not foundt" }
                });



                UpdateUserResponse updateUserResponse = new()
                {
                    Errors = new List<string>(),
                    IsSuccess = true,
                };

                var checkUsername = await _userManager.FindByNameAsync(updateUser.UserName);
                if (checkUsername == null)
                {
                    await _userManager.SetUserNameAsync(user, updateUser.UserName);
                    ChangeUserNameRequest changeUserName = new()
                    {
                        Id = user.Id,
                        UserName = updateUser.UserName
                    };
                    _userData.UpdateUserName(changeUserName);
                }
                else
                    updateUserResponse.Errors.Add("the username is in use");

                var checkEmail = await _userManager.FindByEmailAsync(updateUser.EmailAddress);
                if (checkEmail == null)
                {
                    string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    await _userManager.ChangeEmailAsync(user, updateUser.EmailAddress, token);
                    ChangeEmailRequest changeEmail = new()
                    {
                        UserId = user.Id,
                        NewEmailAddress = updateUser.EmailAddress
                    };
                    _userData.UpdateEmail(changeEmail);
                }
                else
                    updateUserResponse.Errors.Add("the email is in use");

                _userData.UpdateUser(userId, updateUser.FirstName, updateUser.LastName);

                return Ok(new UpdateUserResult()
                {
                    Errors = updateUserResponse.Errors,
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "alle info there can bu updated has ben updated"
                    }
                });
            }

            return BadRequest(new UpdateUserResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });

        }

        [HttpGet]
        [Route("Users/Get/{roleName}")]
        public async Task<IActionResult> GetUsersInRole(string roleName)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetAllUsersInRoleResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }
            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
            bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
            if (!isInRole)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                });
            }

            var findRole = _roleManager.RoleExistsAsync(roleName).Result;
            if (findRole)
            {
                var users = _userManager.GetUsersInRoleAsync(roleName).Result;
                List<UserModel> userInRole = new List<UserModel>();
                foreach (var user in users)
                {
                    var usermodel = _userData.GetUserById(user.Id);
                    userInRole.Add(usermodel);
                }

                return Ok(new GetAllUsersInRoleResult()
                {
                    IsSuccess = true,   
                    UserInRole = userInRole,
                    Message = new List<string>()
                    {
                        $"all user in role { roleName }"
                    }
                });
            }

            return BadRequest(new GetAllUsersInRoleResponse()
            {
                IsSuccess = false,
                Errors = new List<string>()
                {
                    "Role is not found"
                }

            });

        }


        [HttpPost]
        [Route("BoardAccess/Create")]
        public async Task<IActionResult> CreateBoardAccess([FromBody] CreateBaordAccessRequest creatBaordAccess)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new CreateBaordAccessResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }

                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                    });
                }

                _admin.CreatBaordAccess(creatBaordAccess);

                return Ok(new CreateBaordAccessResult()
                {
                    IsSuccess =true,
                    Message =new List<string>
                    {
                        "Group is add'et"
                    }
                });
            }

            return BadRequest(new CreateBaordAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("BoardAccess/Get")]
        public async Task<IActionResult> GetBoardAccess()
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetAllUsersInRoleResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }




            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
            bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
            if (!isInRole)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                });
            }

            var baordAccess = _admin.GetAllBaordAccess();

            return Ok(new GetAllBaordAccessResult()
            {
                IsSuccess = true,
                Message = new List<string>()
                {
                    "all boards"
                },
                BaordAccess = baordAccess,
                Errors = null
            });

        }

        [HttpDelete]
        [Route("BoardAccess/Delete/{boardId}")]
        public async Task<IActionResult> DeleteBoardAccess(Guid boardId, [FromBody] DeleteBoardAccessRequest deleteBoardAccess)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new DeleteBoardAccessResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }

                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                    });
                }

                deleteBoardAccess.Id = boardId;

                _admin.DeleteBoardAccess(boardId);

                return Ok(new DeleteBoardAccessResult()
                {

                });
            }

            return BadRequest(new DeleteBoardAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpPut]
        [Route("BoardAccess/Update/{boardId}")]
        public async Task<IActionResult> UpdateBoardAccess(Guid boardId, [FromBody] UpdateBoardAccessRequest updateBoardAccess)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new UpdateBoardAccessResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }

                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                    });
                }

                updateBoardAccess.Id = boardId;

                _admin.UpdateBoardAccess(updateBoardAccess);

                return Ok(new UpdateBoardAccessResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Board Access has ben updated"
                    }
                });
            }

            return BadRequest(new UpdateBoardAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }


        [HttpPost]
        [Route("GroupAccess/Create")]
        public async Task<IActionResult> CreateGroupAccess([FromBody] CreateGroupAccessRequest createGroupAccess)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new CreateGroupAccessResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                
                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                var isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                        {
                            "You are not a admin"
                        }
                    });
                }

                var groupAccess = _admin.CreatGroupAccess(createGroupAccess);

                return Ok(new CreateGroupAccessResult()
                {
                    IsSuccess = true,
                    Message= new List<string>()
                    {
                        "Group is created"
                    },
                    GroupAccess = groupAccess

                });
            }

            return BadRequest(new CreateGroupAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GroupAccess/Get")]
        public async Task<IActionResult> GetAllGroupAccess()
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetAllGroupAccessResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
            if (getUser == null)
            {
                return BadRequest();
            }
            var isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
            if (!isInRole)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                });
            }

            var groupAccess = _admin.GetAllGroupAccess();

            return Ok(new GetAllGroupAccessResult()
            {
                IsSuccess= true,
                Message = new List<string>()
                {
                    "all group access"
                },
                GroupAccess = groupAccess
            });

        }

        [HttpGet]
        [Route("GroupAccess/Get/{groupId}")]
        public async Task<IActionResult> GetGroupAccess(Guid groupId)
        {
            var canConnect = _context.Database.CanConnect();
            if (!canConnect)
            {
                return BadRequest(new GetAllUsersInRoleResponse()
                {
                    Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                });
            }

            var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
            bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
            if (!isInRole)
            {
                return BadRequest(new GetAllUsersResponse()
                {
                    Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                });
            }

            var groupAccess = _admin.GetGroupAccess(groupId);

            return Ok(new GetGroupAccessByIdResult()
            {
                IsSuccess = true,
                Message= new List<string>()
                {
                    "get assecc by id"
                },
                GroupAccess = groupAccess
            });


        }


        [HttpDelete]
        [Route("GroupAccess/Delete/{groupId}")]
        public async Task<IActionResult> DeleteGroupAccess(Guid groupId)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new DeleteGroupAccessResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }

                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                    });
                }

                var group = _admin.GetGroupAccess(groupId);
                if (group == null)
                    return NotFound(new DeleteGroupAccessResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            $"GroupAccess with id: { groupId } not found"
                        }
                    });

                _admin.DeleteGroupAccess(groupId);

                return Ok(new DeleteGroupAccessResult()
                {
                    IsSuccess = true,
                    Message= new List<string>()
                    {
                        $"GroupAccess { group } has ben deleted"
                    },
                    GroupAccess = group,
                    Errors = null

                });
            }

            return BadRequest(new DeleteGroupAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpPut]
        [Route("GroupAccess/Update/{groupId}")]
        public async Task<IActionResult> UpdateGroupAccess(Guid groupId, [FromBody] UpdateGroupAccessRequest updateGroupAccess)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new UpdateGroupAccessResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }

                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                IdentityUser getUser = await _userManager.FindByIdAsync(UserId);
                bool isInRole = _userManager.IsInRoleAsync(getUser, "Admin").Result;
                if (!isInRole)
                {
                    return BadRequest(new GetAllUsersResponse()
                    {
                        Errors = new List<string>()
                    {
                        "You are not a admin"
                    }
                    });
                }

                var groupAccess = _admin.GetGroupAccess(groupId);

                if (groupAccess == null)
                    return NotFound(new UpdateGroupAccessResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            $"GroupAccess with id: { groupId } not found"
                        }
                    });

                updateGroupAccess.Id = groupId;
                _admin.UpdateGroupAccess(updateGroupAccess);
                var groupAccessUpdate = _admin.GetGroupAccess(groupId);
                return Ok(new UpdateGroupAccessResult()
                {
                    IsSuccess= true,
                    Message = new List<string>()
                    {
                        "GroupAccess has ben updated"
                    }


                });
            }

            return BadRequest(new UpdateGroupAccessResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }
    }
}
