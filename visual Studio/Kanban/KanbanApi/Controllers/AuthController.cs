using KanbanApi.Data;
using KanbanApi.EmailService.Models;
using KanbanApi.EmailService.Models.EmailSender;
using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Responses.Auth;
using KanbanApi.Library.DTOs.Results.Auth;
using KanbanApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
                /// sett up error 
                RegistrationResponse registrationResponse = new()
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
                    return Ok(registrationResult);
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
                    await _emailSender.FirstTimeLoggedInFromIpEmailAsync(message, ip);
                }

                /// Generate token
                var jwtToken = await GenerateJwtToken(user, ip);

                if (jwtToken.Errors.Count > 0)
                    return BadRequest(jwtToken);

                return Ok(jwtToken);
            }

            return BadRequest(new LogInResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        private async Task<LogInResult> GenerateJwtToken(IdentityUser user, string ip)
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

            LogInResult logInResult = new()
            {
                Roles = new List<string>(),
                IsSuccess = false,
                Message = new List<string>(),
                Errors = new List<string>()
            };

            logInResult.IsSuccess = true;
            logInResult.Token = Access_Token;
            logInResult.RefreshToken = refreshToken.Token;
            foreach (var role in roles)
            {
                logInResult.Roles.Add(role.Name);
            }

            /// return login result
            return logInResult;


        }


        private static string GetIpAddress()
        {
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
            bool isSuccess = false;

            var checkFirstTimeIp = _context.RefreshTokens.Where(r => r.UserId == userId && r.Ip == ip).FirstOrDefault();
            if (checkFirstTimeIp == null)
            {
                //authResult.Message.Add("first time logget in on ip: " + ip + " an email will be send");
                isSuccess = true;
            }

            return isSuccess;
        }

        private static string RandomString(int length)
        {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(x => x[random.Next(x.Length)]).ToArray());
        }


    }
}
