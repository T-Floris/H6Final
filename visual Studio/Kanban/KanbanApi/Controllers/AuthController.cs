using KanbanApi.Data;
using KanbanApi.Models;

using KanbanApi.EmailService.Models;
using KanbanApi.EmailService.Models.EmailSender;

using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Requests.Token;
using KanbanApi.Library.DTOs.Responses.Auth;
using KanbanApi.Library.DTOs.Responses.Token;
using KanbanApi.Library.DTOs.Results.Auth;
using KanbanApi.Library.DTOs.Results.Token;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserData _userData;
        private readonly IConfiguration _config;
        private readonly TokenValidationParameters _tokenValidationParams;
        private readonly IEmailSender _emailSender;

        private const string _defaultTokenProviderName = "Default";

        public AuthController(UserManager<IdentityUser> userManager, ApplicationDbContext context, IUserData userData, IConfiguration config, TokenValidationParameters tokenValidationParameters, IEmailSender emailSender)
        {
            _userManager = userManager;
            _context = context;
            _userData = userData;
            _config = config;
            _tokenValidationParams = tokenValidationParameters;
            _emailSender = emailSender;
        }

        [HttpPost]
        [AllowAnonymous] 
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest userToCreate)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }
                /// sett up error 
                RegistrationResult registrationResponse = new()
                {
                    Message = new List<string>(), /// the Message there will show the action there have ben taken
                    Errors = new List<string>(), /// all the errors that happened 
                    IsSuccess = false /// if ther is an error this will not return true
                };

                /// find if email or username is in use
                /// Find if ther is a user whit that email
                var existingUser = await _userManager.FindByEmailAsync(userToCreate.EmailAddress);

                /// if there is a user whit the selected "EmailAddress" log error 
                if (existingUser != null)
                    registrationResponse.Errors.Add("the email is already in use");

                /// Find if ther is a user whit that "UserName" 
                var username = await _userManager.FindByNameAsync(userToCreate.UserName);

                /// if there is a user whit the selected "username" log error 
                if (username != null)
                    registrationResponse.Errors.Add("the username is already in use");

                /// return errors and dont create user
                if (existingUser != null && username != null)
                {
                    return StatusCode(409, registrationResponse);
                }

                /// fill user withe info
                IdentityUser newUser = new()
                {

                    UserName = userToCreate.UserName,
                    Email = userToCreate.EmailAddress,
                    EmailConfirmed = false
                };

                /// create user with all the given information
                IdentityResult isCreated = await _userManager.CreateAsync(newUser, userToCreate.Password);

                /// check if the user is created
                if (isCreated.Succeeded)
                {
                    /// check if there are a user with that EmailAddress (to make sure that the user is added)
                    existingUser = await _userManager.FindByEmailAsync(userToCreate.EmailAddress);

                    /// send a bad request if it can't find the user
                    if (existingUser is null)
                    {
                        registrationResponse.Errors.Add("the user can somehove not be found");
                        return BadRequest(registrationResponse);
                    }

                    /// set the value of the id
                    userToCreate.Id = existingUser.Id;
                    /// set the time of creation to now
                    userToCreate.CreatedDate = DateTime.UtcNow;
                    userToCreate.Avatar = userToCreate.Avatar;

                    /// adding user to databes "KanbanData" on table "User"
                    _userData.Registration(userToCreate);
                    /// log message
                    registrationResponse.Message.Add("the user is created");

                    /// add user to role
                    await _userManager.AddToRoleAsync(existingUser, "User");
                    /// log message
                    registrationResponse.Message.Add("Role addit to user");

                    #region email

                    /// Generate email confirmation token
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(existingUser);

                    /// check if ther is a token and return error if there is no token
                    if (token == null)
                    {
                        registrationResponse.IsSuccess = false;
                        registrationResponse.Errors.Add("token not created");
                        return BadRequest(registrationResponse);
                    }

                    /// Send emali to
                    string[] to = { existingUser.Email };
                    /// Email subject
                    string subject = $"confim email {existingUser.Email}";
                    /// Email content
                    string content = "";
                    /// files to send with
                    IFormFileCollection attachments = null;
                    /// confirm email link
                    string confimeEmailLink = $"http://localhost:3000/ConfirmEmail?userid={existingUser.Id}&token={token}";

                    /// create message
                    // TODO: change email
                    //var message = new Message(to, subject, content, attachments, confimeEmailLink);
                    var message = new Message(new string[] { "psnfloris@gmail.com" }, subject, content, attachments, confimeEmailLink);

                    /// send email
                    await _emailSender.ConfirmEmailAsync(message, existingUser);

                    #endregion

                    /// log if the mail is send
                    registrationResponse.IsSuccess = true;
                    /// log all reciper of email
                    foreach (var email in to)
                    {
                        registrationResponse.Message.Add($"email has been send to {email}");
                    }

                    RegistrationResult registrationResult = registrationResponse;

                    /// return 
                    return Ok(new RegistrationResult()
                    {
                        IsSuccess = registrationResult.IsSuccess,
                        Errors = registrationResult.Errors,
                        Message = registrationResult.Message
                    });
                }
                else
                {
                    /// return all errors 
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                        IsSuccess = false
                    });
                }


                
            }

            /// return an error if the paylode is Invalid
            return BadRequest(new RegistrationResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LogInRequest logIn)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new LogInResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }
                /// find user by email
                var user = await _userManager.FindByNameAsync(logIn.EmailAddress);
                /// return error if user not found
                if (user == null)
                {
                    return BadRequest(new LogInResponse()
                    {
                        Errors = new List<string>()
                        {
                            "User not fount"
                        }
                    });
                }

                /// check if the password match
                var isCorrect = await _userManager.CheckPasswordAsync(user, logIn.Password);
                /// return error if password is worng
                if (!isCorrect)
                {
                    return BadRequest(new LogInResponse()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid password"
                        },
                        IsSuccess = false
                    });
                }

                /// get users ip
                string ip = GetIpAddress();
                /// check if the user has logt in on the ip
                bool firstTime = CheckIp(user.Id, ip);

                /// if it is the first time send email to user
                if (firstTime)
                {
                    /// Send emali to
                    string[] to = { user.Email };
                    /// Email subject
                    string subject = "New login location detected";
                    /// Email content
                    string content = "";
                    /// files to send with
                    IFormFileCollection attachments = null;
                    /// confirm email link
                    string confimeEmailLink = null;

                    // TODO: change email
                    //var message = new Message(to, subject, content, attachments, confimeEmailLink);
                    /// create message
                    var message = new Message(new string[] { "psnfloris@gmail.com" }, subject, content, attachments, confimeEmailLink);

                    /// send email to user, there is a new login location
                    await _emailSender.FirstTimeLoggedInFromIpEmailAsync(message, user, ip);
                }

                /// Generate token
                var jwtToken = await GenerateJwtToken(user, ip);

                /// check if there are an error
                if (jwtToken.Errors.Count > 0)
                    return BadRequest(jwtToken);

                /// return the token information
                return Ok(jwtToken);
            }

            /// return an error if the paylode is Invalid
            return BadRequest(new LogInResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("LogOff")]
        public async Task<IActionResult> Logoff()
        {

            /// store token's
            TokenRevokeRequest revokeToken = new();

            /// get tokens from cookies 
            revokeToken.Token = Request.Cookies["Token"];
            revokeToken.RefreshToken = Request.Cookies["RefreshToken"];

            /// make sure the model is validate
            if (TryValidateModel(revokeToken))
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new TokenRevokeResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }
                /// Revoke Token and make it unusebale
                TokenRevokeResult tokenRevoke = await RevokeToken(revokeToken);

                /// null check 
                if (tokenRevoke == null)
                {
                    return BadRequest(new TokenRevokeResponse()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid tokens"
                        },
                        IsSuccess = false
                    });
                }

                /// Delete all cokies from login
                foreach (var cookie in Request.Cookies.Keys)
                {
                    Response.Cookies.Delete(cookie);
                }

                /// return result
                return Ok(tokenRevoke);
            }

            /// return an error if the paylode is Invalid
            return BadRequest(new TokenRevokeResult()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }


        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest deleteUser)
        {
            if (ModelState.IsValid)
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
                deleteUser.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                /// make sure the user wont to delet thery acount
                if (deleteUser.ToDelete)
                {
                    /// find user by id
                    IdentityUser user = await _userManager.FindByIdAsync(deleteUser.UserId);

                    /// null check
                    if (user is null)
                    {
                        return NotFound(new DeleteUserResponse 
                        {
                            Errors = new List<string>()
                            {
                                $"user whit id: { deleteUser.UserId } no found"
                            },
                            IsSuccess = false
                        });

                    }

                    /// Delete user
                    await _userManager.DeleteAsync(user);
                    /// Delete user
                    _userData.DeleteUser(deleteUser);

                    /// return Success message
                    return Ok(new DeleteUserResult()
                    {
                        IsSuccess = true,
                        Message = $"the user is deletet"
                    }); 
                }

                /// return if the user did not accept to delete thery
                return Ok(new DeleteUserResponse()
                {
                    Errors= new List<string>()
                    {
                        "user did not accept to have thery account deleted"
                    },
                    IsSuccess = false
                });

            }
            /// return an error if the paylode is Invalid
            return BadRequest(new DeleteUserResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload",
                }, 
                IsSuccess = false
            });

        }


        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest email)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new ForgotPasswordResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                /// check if email is in use
                var existingUser = await _userManager.FindByEmailAsync(email.EmailAddress);

                /// null check
                if (existingUser == null)
                {
                    return BadRequest(new ForgotPasswordResponse()
                    {
                        Errors = new List<string>()
                        {
                            $"email not found { email.EmailAddress }",
                        }, 
                        IsSuccess = false

                    });
                }

                /// Generate token to password reset
                var token = await _userManager.GeneratePasswordResetTokenAsync(existingUser);


                /// check if ther is a token
                if (token == null)
                {
                    return NotFound(new ForgotPasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "token not created"
                        } 
                    });
                }


                /// Email subject
                string subject = "Forgot password";
                /// email to send Message to
                string[] to = { existingUser.Email };
                string content = "";
                IFormFileCollection attachments = null;
                string confimeEmailLink = $"http://localhost:3000/ForgotPassword?UserId={existingUser.Id}&Token={token}";


                // TODO: change email
                /// create email to send
                var message = new Message(new string[] { "tino.p.s.floris@gmail.com" }, subject, content, attachments, confimeEmailLink);
                //var message = new Message(to, subject, content, attachments, confimeEmailLink);

                ///send reset password email
                await _emailSender.ResetPasswordEmailAsync(message);

                /// Return result 
                return Ok(new ForgotPasswordResult()
                {
                    EmailAddress = existingUser.Email,
                    UserId = Guid.Parse(existingUser.Id),
                    Token = token,
                    IsSuccess = true,
                    Message = "email send"
                });
            }
            /// return an error if the paylode is Invalid
            return BadRequest(new ForgotPasswordResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload",
                }, 
                IsSuccess = false
            });
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePassword)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new ChangePasswordResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                /// find logt in user by id
                string loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                /// find user by id
                IdentityUser user = await _userManager.FindByIdAsync(loggedInUserId);

                /// null check
                if (user == null)
                    return NotFound(new ChangePasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "User not foundt"
                        } 
                    });

                /// check the password is valid
                bool isPassword = await _userManager.CheckPasswordAsync(user, changePassword.OldPassword);

                /// check if the password is wrong
                if (!isPassword)
                {
                    return BadRequest(new ChangePasswordResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "The password is invalid"
                        } 
                    });
                }
                /// change the password
                await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);

                /// return success message
                return Ok(new ChangePasswordResult()
                {
                    Message = "the password has been change",
                    IsSuccess = true
                });
            }
            /// return an error if the paylode is Invalid
            return BadRequest(new ChangePasswordResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload",
                },
                IsSuccess = false
            });
        }

        [HttpPost]
        [Route("ChangeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailRequest changeEmail)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new ChangeEmailResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }
                /// find logt in user by id
                string loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                /// find user by id
                IdentityUser user = await _userManager.FindByIdAsync(loggedInUserId);

                /// null check
                if (user == null)
                {
                    return NotFound(new ChangeEmailResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Can not findt the user"
                        } 
                    });
                }

                /// Generate token to change email
                var token = await _userManager.GenerateChangeEmailTokenAsync(user, changeEmail.NewEmailAddress);

                /// null check
                if (token == null)
                {
                    return NotFound(new ChangeEmailResponse()
                    {
                        IsSuccess = false,
                        Errors =
                        {
                            "token not created"
                        }
                    });
                }

                /// send email with token

                string[] to = { user.Email };
                string subject = "change email";
                string content = "";
                IFormFileCollection attachments = null;
                /// token link
                string changeEmailLink = $"http://localhost:3000/ChangeEmail?userid={user.Id}&token={token}";




                //var message = new Message(to, subject, content, attachments, changeEmailLink);
                var message = new Message(new string[] { "tino.p.s.floris@gmail.com" }, subject, content, attachments, changeEmailLink);

                /// send email
                await _emailSender.ChangeEmailAsync(message);

                /// return result
                return Ok(new ChangeEmailResult()
                {
                    IsSuccess = true,
                    Message = "An Email has been send to the user with info"
                });
            }
            /// return an error if the paylode is Invalid
            return BadRequest(new ChangeEmailResponse()
            {
                Errors = { "Invalid payload" },
                IsSuccess = false
            });

        }

        [HttpPost]
        [Route("ChangeUserName")]
        public async Task<IActionResult> ChangeUserName([FromBody] ChangeUserNameRequest changeUserName)
        {
            if (ModelState.IsValid)
            {
                var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new ChangeUserNameResponse()
                    {
                        Errors = new List<string>()
                    {
                        "can't reach the server"
                    }
                    });
                }
                /// find logt in user by id
                string loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                /// set userid
                changeUserName.Id = loggedInUserId;

                /// find user by id
                IdentityUser user = await _userManager.FindByIdAsync(loggedInUserId);

                /// null check
                if (user == null)
                    return NotFound(new ChangeUserNameResponse()
                    {
                        IsSuccess = false,
                        Errors = { "User not foundt" }
                    });

                ///find a user with username
                var checkUsername = await _userManager.FindByNameAsync(changeUserName.UserName);
                

                /// change the password
                if (checkUsername is not null)
                {
                    ChangeUserNameResponse userNameResponse = new ChangeUserNameResponse()
                    {
  
                    };
                    return BadRequest(new ChangeUserNameResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string> { "username is in use" }
                    });
                }

                /// update username for user
                await _userManager.SetUserNameAsync(user, changeUserName.UserName);

                /// update the username
                _userData.UpdateUserName(changeUserName);

                return Ok(new ChangeUserNameResult
                {
                    IsSuccess = true,
                    Message = "User Name is updated"
                });


            }

            return BadRequest(new ChangeUserNameResponse()
            {
                Errors = { "Invalid payload" },
                IsSuccess = false
            });

        }

        [HttpPost]
        [AllowAnonymous]
        [Route("RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            /// store token's
            TokenRefreshRequest tokenRequest = new();

            /// get tokens from cookies 
            //var CookieValue = Request.Cookies;
            if (Request.Cookies["key"] != null)
            {
                var value = Request.Cookies["key"];
            }

            tokenRequest.Token = Request.Cookies["Token"];
            tokenRequest.RefreshToken = Request.Cookies["RefreshToken"];

            ///// make sure the model is validate
            //if (TryValidateModel(tokenRequest))
            //{
            var canConnect = _context.Database.CanConnect();
                if (!canConnect)
                {
                    return BadRequest(new TokenRefreshResponse()
                    {
                        Errors = new List<string>()
                        {
                            "can't reach the server"
                        }
                    });
                }
                /// Verify and generate
                var result = await VerifyAndGenerateToken(tokenRequest);

                /// null check
                if (result == null)
                {
                    return BadRequest(new TokenRefreshResult()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid tokens"
                        },
                        IsSuccess = false
                    });
                }

                if (result.Errors.Count > 0)
                {
                    return Ok(result);

                }


                return Ok(result);
            //}
            /// return an error if the paylode is Invalid
            return BadRequest(new TokenRefreshResult()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }


        
        private async Task<TokenResult> GenerateJwtToken(IdentityUser user, string ip)
        {
            /// Set the rules for the cookie
            CookieOptions cookieOptions = new()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            };

            /// find all the users roles by 'userId' 
            var roles = from ur in _context.UserRoles
                        join r in _context.Roles on ur.RoleId equals r.Id
                        where ur.UserId == user.Id
                        select new
                        {
                            ur.UserId,
                            ur.RoleId,
                            r.Name
                        };

            /// minutes to live
            int timetolive = 15;

            /// create a claim 
            var claims = new List<Claim>
            {
                new Claim("Id", user.Id),
                /// set the claimtype Name to "username"
                new Claim(ClaimTypes.Name, user.UserName),
                /// set the claimtype NameIdentifier to "user.Id" 
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                /// set the claims lifespan to begine
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString()),
                /// set the claims lifspan to end after x day
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.UtcNow.AddDays(timetolive)).ToUnixTimeSeconds().ToString()),
                /// set an unique identifier for the JWT (prevent the JWT from being replayed)
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),                
            };

            /// add all the users roles to the claim list
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            /// get the SecurityKey (best to store in a key voldt)
            string key = _config.GetValue<string>("Secrets:SecurityKey");

            /// generate a token there secure the useris info by Encoding it whit the "key" and a SecurityAlgorithms
            SymmetricSecurityKey symmetricSecurityKey = new(Encoding.UTF8.GetBytes(key));
            SigningCredentials credentials = new(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            /// create jwt header
            JwtHeader header = new(credentials);
            /// create jwt payload
            JwtPayload payload = new(claims);

            /// create security token
            JwtSecurityToken jwt = new(header, payload);

            /// Write access token
            string Access_Token = new JwtSecurityTokenHandler().WriteToken(jwt);

            /// add token to Cookies
            Response.Cookies.Append("Token", Access_Token, cookieOptions);



            /// Create refresh token
            RefreshToken refreshToken = new()
            {
                JwtId = jwt.Id,
                IsUsed = false,
                Ip = ip,
                IsRevorked = false,
                UserId = user.Id,
                Adddate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                Token = RandomString(35) + Guid.NewGuid()
            };

            /// add RefreshToken to cookie
            Response.Cookies.Append("RefreshToken", refreshToken.Token, cookieOptions);

            /// add token to database
            await _context.RefreshTokens.AddAsync(refreshToken);
            /// save changes and update database
            await _context.SaveChangesAsync();

            /// create ruton message
            LogInResult logInResult = new()
            {
                Errors = new List<string>(),
                Message = new List<string>(),
                Roles = new List<string>()
                
                
            };

            logInResult.IsSuccess = true;
            logInResult.Token = Access_Token;
            logInResult.RefreshToken = refreshToken.Token;
            logInResult.Message.Add("token has benn created");
            foreach (var role in roles)
            {
                logInResult.Roles.Add(role.Name);
            }



            /// return
            return logInResult;


        }

        private async Task<TokenResult> VerifyAndGenerateToken(TokenRefreshRequest tokenRequest)
        {
            JwtSecurityTokenHandler jwtTokenHandler = new();

            try
            {
                /// Validation 1 - Validation JWT token format and encryption alg
                var principal = GetPrincipalFromExpiredToken(tokenRequest.Token);




                /// validation 2 - validate existence of the token
                var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);

                if (storedToken is null)
                {


                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token does not exist"
                        }
                    };
                }

                /// Validation 3 - validate expiry date
                var utcExpiryDate = long.Parse(principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expiryDate = UnixTimeStampToDateTime(utcExpiryDate);

                if (expiryDate.ToUniversalTime() > DateTime.UtcNow)
                {
                    var roles = from ur in _context.UserRoles
                                join r in _context.Roles on ur.RoleId equals r.Id
                                where ur.UserId == storedToken.UserId
                                select new
                                {
                                    ur.UserId,
                                    ur.RoleId,
                                    r.Name
                                };

                    TokenRefreshResponse authResult1 = new()
                    {
                        Roles = new List<string>(),
                        IsSuccess = false,
                        Message = new List<string>(),
                        Errors = new List<string>()
                    };


                    foreach (var role in roles)
                    {
                        authResult1.Roles.Add(role.Name);
                    }
                    authResult1.IsSuccess = false;
                    authResult1.Errors.Add("Token has not yet expired");
                    authResult1.RefreshToken = tokenRequest.RefreshToken;
                    authResult1.Token = tokenRequest.Token;

                    return authResult1;
                }



                /// Validation 4 - validate if used
                if (storedToken.IsUsed)
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token has been used"
                        }
                    };
                }

                /// Validation 5 - validate if revoked
                if (storedToken.IsRevorked)
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token has been revoked"
                        }
                    };
                }

                /// Validation 6 - validate the id
                var jti = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if (storedToken.JwtId != jti)
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token dosen't match"
                        }
                    };
                }

                /// Validation 7 - validate stored token expiry date
                if (storedToken.ExpiryDate < DateTime.UtcNow)
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() {
                            "Refresh token has expired"
                        }
                    };
                }

                /// Validation 8 - validate email
                var dbuser = await _userManager.FindByIdAsync(storedToken.UserId);


                TokenResult jwtToken = new()
                {
                    Roles = new List<string>(),
                    IsSuccess = false,
                    Message = new List<string>(),
                    Errors = new List<string>()
                };

                string ip = GetIpAddress();
                bool firstTime = CheckIp(dbuser.Id, ip);

                if (firstTime)
                {
                    /// Message to send
                    string[] to = { dbuser.Email };
                    string subject = "New login location detected";
                    string content = "";
                    IFormFileCollection attachments = null;
                    string confimeEmailLink = null;

                    // TODO: change email
                    //var message = new Message(to, subject, content, attachments, confimeEmailLink);
                    var message = new Message(new string[] { "tino.p.s.floris@gmail.com" }, subject, content, attachments, confimeEmailLink);

                    /// send email to user, there is a new login location
                    await _emailSender.FirstTimeLoggedInFromIpEmailAsync(message, dbuser, ip);
                }


                if (jwtToken.Errors.Count > 0)
                {
                    jwtToken.IsSuccess = false;

                    return jwtToken;

                }


                /// update token
                storedToken.Ip = ip;

                storedToken.IsUsed = true;
                _context.RefreshTokens.Update(storedToken);
                await _context.SaveChangesAsync();

                return await GenerateJwtToken(dbuser, ip);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Lifetime validation failed. The token is expired."))
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() {
                            "Token has expired please re-login"
                        }
                    };
                }
                else
                {
                    return new TokenRefreshResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() {
                            "Something went wrong."
                        }
                    };
                }
            }
        }

        private async Task<TokenRevokeResult> RevokeToken(TokenRevokeRequest tokenRequest)
        {
            JwtSecurityTokenHandler jwtTokenHandler = new();

            try
            {

                /// Validation 1 - Validation JWT token format
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequest.Token, _tokenValidationParams, out var validatedToken);

                /// Validation 2 - Validate encryption alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature, StringComparison.InvariantCultureIgnoreCase);

                    if (!result)
                    {
                        return null;
                    }
                }

                /// validation 4 - validate existence of the token
                var storedToken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequest.RefreshToken);

                if (storedToken is null)
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token does now exist"
                        }
                    };
                }

                /// Validation 5 - validate if used
                if (storedToken.IsUsed)
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token has ben used"
                        }
                    };
                }

                /// Validation 6 - validate if revoked
                if (storedToken.IsRevorked)
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token has benn revoked"
                        }
                    };
                }

                /// Validation 7 - validate the id
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if (storedToken.JwtId != jti)
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>()
                        {
                            "Token dosen't match"
                        }
                    };
                }



                /// update token in database

                storedToken.IsRevorked = true;
                _context.RefreshTokens.Update(storedToken);
                await _context.SaveChangesAsync();

                TokenRevokeResult authResult = new()
                {
                    Errors = new List<string>(),
                    IsSuccess = true,
                    Message = new List<string>() { "the user is logt of" },
                };




                return authResult;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Lifetime validation failed. The token is expired."))
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() {
                            "Token has expired please re-login"
                        }
                    };
                }
                else
                {
                    return new TokenRevokeResponse()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() {
                            "Something went wrong."
                        }
                    };
                }
            }

        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            /// get the Security Key
            string key = _config.GetValue<string>("Secrets:SecurityKey");

            /// set validatin
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, 
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };

            /// token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            /// Get principal's
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            /// set SecurityToken to JwtSecurityToken
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            /// check SecurityAlgorithms
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            /// return principal
            return principal;
        }

        private static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            /// utc start date
            var dateTimwVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            /// add "unixTimeStamp" to "dateTimwVal"
            dateTimwVal = dateTimwVal.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTimwVal;
        }

        private static string GetIpAddress()
        {
            ///get the users public ip

            string url = "http://checkip.dyndns.org";
            WebRequest req = WebRequest.Create(url);
            WebResponse resp = req.GetResponse();
            StreamReader sr = new(resp.GetResponseStream());
            string response = sr.ReadToEnd().Trim();
            string[] ipAddressWithText = response.Split(':');
            string ipAddressWithHTMLEnd = ipAddressWithText[1][1..];
            string[] ipAddress = ipAddressWithHTMLEnd.Split('<');
            string mainIP = ipAddress[0];

            return mainIP;
        }

        private bool CheckIp(string userId, string ip)
        {
            /// set success to false
            bool isSuccess = false;

            /// check if ip and user match
            var checkFirstTimeIp = _context.RefreshTokens.Where(r => r.UserId == userId && r.Ip == ip).FirstOrDefault();
            /// if there is no match return true
            if (checkFirstTimeIp == null)
            {                
                isSuccess = true;
            }

            return isSuccess;
        }

        private static string RandomString(int stringLength)
        {

            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            /// create a random string the length of int
            return new string(Enumerable.Repeat(chars, stringLength).Select(x => x[random.Next(x.Length)]).ToArray());
        }
    }
}
