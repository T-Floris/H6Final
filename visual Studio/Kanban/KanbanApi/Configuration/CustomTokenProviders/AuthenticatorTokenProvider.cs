using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace KanbanApi.Configuration.CustomTokenProviders
{
    public class AuthenticatorTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
    {
        public AuthenticatorTokenProvider(IDataProtectionProvider dataProtectionProvider,
            IOptions<AuthenticatorTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
            : base(dataProtectionProvider, options, logger)
        {
        }
    }

    public class AuthenticatorTokenProviderOptions : DataProtectionTokenProviderOptions
    {

    }
}
