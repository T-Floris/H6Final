using KanbanApi.Configuration.CustomTokenProviders;
using KanbanApi.Configuration.TokenLifespan;
using KanbanApi.Data;
using KanbanApi.EmailService.Configuration;
using KanbanApi.EmailService.Models.EmailSender;
using KanbanApi.Library.DataAccess.User;
using KanbanApi.Library.Internal.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy; 
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi
{
    public class Startup
    {
        /// <summary>
        /// set the default token provider name to be "Default"
        /// </summary>
        private const string _defaultTokenProviderName = "Default";

        /// <summary>
        /// construct the variblaes
        /// </summary>
        /// <param name="configuration">set the configuration to be the sam instens evrey time</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            /// set's the database ontext
            services.AddDbContext<ApplicationDbContext>(options =>
                /// selecting the database to use from the "appsettings.json" file in the array of "ConnectionStrings" by it's name "DefaultConnection"
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDatabaseDeveloperPageExceptionFilter();

            /// setup the token validation
            var tokenvalidationparams = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Secrets:SecurityKey"))),
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddSingleton(tokenvalidationparams);




            /// setting up the rules for creating a user
            services.AddIdentity<IdentityUser, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 7; /// set the length of the password to be minimum 7 characters 
                opt.Password.RequireDigit = true; /// password must have numbers
                opt.Password.RequireUppercase = true; /// password must have a uppercase letter

                opt.User.RequireUniqueEmail = true; /// the same email cannot be used twice
                opt.SignIn.RequireConfirmedEmail = true; /// user must confirm email

                opt.Tokens.AuthenticatorTokenProvider = _defaultTokenProviderName;
                opt.Tokens.ChangeEmailTokenProvider = _defaultTokenProviderName;
                opt.Tokens.ChangePhoneNumberTokenProvider = _defaultTokenProviderName;
                opt.Tokens.EmailConfirmationTokenProvider = _defaultTokenProviderName;
                opt.Tokens.PasswordResetTokenProvider = _defaultTokenProviderName;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddTokenProvider<Configuration.CustomTokenProviders.AuthenticatorTokenProvider<IdentityUser>>(_defaultTokenProviderName)
            .AddTokenProvider<ChangeEmailTokenProvider<IdentityUser>>(_defaultTokenProviderName)
            .AddTokenProvider<ChangePhoneNumberTokenProvider<IdentityUser>>(_defaultTokenProviderName)
            .AddTokenProvider<EmailConfirmationTokenProvider<IdentityUser>>(_defaultTokenProviderName)
            .AddTokenProvider<PasswordResetTokenProvider<IdentityUser>>(_defaultTokenProviderName);

            /// setting up the "TokenLifespanConfiguration"
            var tokenLifespanconfig = Configuration
                .GetSection("TokenLifespan")
                .Get<TokenLifespanConfiguration>();
            services.AddSingleton(tokenLifespanconfig);

            /// lifespan for all tokens
            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(tokenLifespanconfig.DataProtection));

            /// lifespan for Authenticator token 
            services.Configure<AuthenticatorTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(tokenLifespanconfig.Authenticator));

            /// lifespan for ChangeEmail token
            services.Configure<ChangeEmailTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(tokenLifespanconfig.ChangeEmail));

            /// lifespan for ChangePhoneNumber token
            services.Configure<ChangePhoneNumberTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(tokenLifespanconfig.ChangePhoneNumber));

            /// lifespan for PasswordReset token
            services.Configure<PasswordResetTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(tokenLifespanconfig.PasswordReset));

            /// lifespan for EmailConfirmation token
            services.Configure<EmailConfirmationTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromDays(tokenLifespanconfig.EmailConfirmation));

            /// setup controller with views
            services.AddControllersWithViews();

            /// add cors to the service
            services.AddCors();
            /// add Razor Pages to the service
            services.AddRazorPages();

            /// configure the liftime of a token
            services.ConfigureApplicationCookie(cookie =>
            {
                cookie.ExpireTimeSpan = TimeSpan.FromSeconds(30);
                cookie.SlidingExpiration = true;
            });

            /// database actions
            ///     post
            ///     put
            ///     get
            ///     delete
            services.AddTransient<ISqlDataAccess, SqlDataAccess>();
            /// Stored Procedures calls for user
            services.AddTransient<IUserData, UserData>();


            /// setting the Authentication to JwtBearer
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", jwtBearerOptions =>
            {
                /// save the token
                jwtBearerOptions.SaveToken = true;
                /// set the validation for the token
                jwtBearerOptions.TokenValidationParameters = tokenvalidationparams;
                /// adds event to the token
                jwtBearerOptions.Events = new JwtBearerEvents
                {
                    /// detecting why the authentication failed 
                    OnAuthenticationFailed = context =>
                    {
                        /// the token has expired
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            /// Header to tell what agtion hapendt
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            /// setup the Email Configuration 
            var emailconfig = Configuration
                .GetSection("EmailConfigration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailconfig);

            var emailTemplates = Configuration
                .GetSection("EmailPath");
            services.AddSingleton(emailTemplates);

            services.AddScoped<IEmailSender, EmailSender>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
