using KanbanApi.Data;
using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.DTOs.Requests.Search;
//using KanbanApi.Library.DTOs.Requests.User;
//using KanbanApi.Library.DTOs.Responses.User;
//using KanbanApi.Library.DTOs.Results.User;
using KanbanApi.Library.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserData _userData;

        public UserController(IUserData userData)
        {
            _userData = userData;
        }

        [HttpGet]
        public UserModel GetById()
        {
            /// find userl
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            /// return user
            return _userData.GetUserById(userId);
        }

        //[HttpGet]
        //[Route("SearchUser")]
        //public IActionResult SearchUser([FromBody] SearchUserRequest searchUser)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var users = _userData.SearchForUser(searchUser);

        //        if (users.Count <= 0)
        //        {
        //            return NotFound(new SearchUserResult()
        //            {
        //                IsSuccess = false,
        //                Errors = new List<string>()
        //                {
        //                    "No user found"
        //                }
        //            });
        //        }
        //        return Ok(new SearchUserResult()
        //        {
        //            Users = users,
        //            IsSuccess = true,
        //            Message = new List<string>()
        //            {
        //                "list of user found by search"
        //            }

        //        });
        //    }

        //    return BadRequest(new SearchUserResponse()
        //    {
        //        Errors = new List<string>()
        //        {
        //            "Invalid payload"
        //        },
        //        IsSuccess = false
        //    });
        //}


    }
}
