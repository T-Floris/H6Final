using KanbanApi.Data;
using KanbanApi.EmailService.Models.EmailSender;
using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Requests.TokenConfirmation;
using KanbanApi.Library.DTOs.Responses.TokenConfirmation;
using KanbanApi.Library.DTOs.Results.TokenConfirmation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class TokenConfirmationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserData _userData;


        public TokenConfirmationController(UserManager<IdentityUser> userManager, IUserData userData)
        {
            _userManager = userManager;
            _userData = userData;
        }


        [HttpPost]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody] TokenConfirmEmailRequest tokenConfirmEmail)
        {
            if (ModelState.IsValid)
            {
                string findUser = User.FindFirstValue(tokenConfirmEmail.UserId);

                /// find user by id
                IdentityUser user = await _userManager.FindByIdAsync(tokenConfirmEmail.UserId);

                if (user == null)
                {
                    return NotFound(new TokenConfirmEmailResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "User not found"
                        }
                    });

                }
                
                //await _userManager.ConfirmEmailAsync(user, tokenConfirmEmail.Token);

                bool isConfimd = await _userManager.IsEmailConfirmedAsync(user);

                if (isConfimd)
                {
                    return BadRequest(new TokenConfirmEmailResponse()
                    {
                        Errors = new List<string>()
                        {
                            "the email can not be confirmed"
                        },
                        IsSuccess = false
                    });
                }

                return Ok(new TokenConfirmEmailResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "user's Email has ben confirmt"
                    }

                });


            }

            /// return an error if the paylode is Invalid
            return BadRequest(new TokenConfirmEmailResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });

        }

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] TokenForgotPasswordRequest tokenForgotPassword)
        {
            if (ModelState.IsValid)
            {
                IdentityUser user = await _userManager.FindByIdAsync(tokenForgotPassword.UserId);
                //string findUser = User.FindFirstValue(tokenForgotPassword.UserId);

                /// find user by id
               // IdentityUser user = await _userManager.FindByIdAsync(findUser);

                if (user == null)
                {
                    return NotFound(new TokenForgotPasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "User not found"
                        }
                    });
                }

                await _userManager.ResetPasswordAsync(user, tokenForgotPassword.Token, tokenForgotPassword.NewPassword);
                
                bool cp = await _userManager.CheckPasswordAsync(user, tokenForgotPassword.NewPassword);
                if (!cp)
                {
                    return Ok(new TokenForgotPasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "no change"
                        }
                    });
                }

                return Ok(new TokenForgotPasswordResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "user's password has ben changet"
                    }

                });
            }

            return BadRequest(new TokenForgotPasswordResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });

        }

        [HttpPost]
        [Route("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] TokenChangeEmailRequest tokenChangeEmail)
        {
            if (ModelState.IsValid)
            {
                string findUser = User.FindFirstValue(tokenChangeEmail.UserId);

                /// find user by id
                IdentityUser user = await _userManager.FindByIdAsync(findUser);

                if (user == null)
                {
                    return NotFound(new TokenForgotPasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "User not found"
                        }
                    });
                }

                await _userManager.ChangeEmailAsync(user, tokenChangeEmail.NewEmail, tokenChangeEmail.Token);

                bool c = _userManager.FindByEmailAsync(tokenChangeEmail.NewEmail).Result.EmailConfirmed;
                ChangeEmailRequest changeEmail = new()
                {
                    NewEmailAddress = tokenChangeEmail.NewEmail,
                    UserId = tokenChangeEmail.UserId,
                };

                _userData.UpdateEmail(changeEmail);

                return Ok(new TokenChangeEmailResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "user's email has ben changet"
                    }
                });


            }

            return BadRequest(new TokenChangeEmailResponse()
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
