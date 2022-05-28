using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace KanbanApi.Configuration.CustomTokenProviders
{
    public class ChangeEmailTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
    {
        public ChangeEmailTokenProvider(IDataProtectionProvider dataProtectionProvider,
            IOptions<ChangeEmailTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
            : base(dataProtectionProvider, options, logger)
        {
        }
    }

    public class ChangeEmailTokenProviderOptions : DataProtectionTokenProviderOptions
    {

    }
}
