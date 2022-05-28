using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace KanbanApi.Configuration.CustomTokenProviders
{
    public class ChangePhoneNumberTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
    {
        public ChangePhoneNumberTokenProvider(IDataProtectionProvider dataProtectionProvider,
            IOptions<ChangePhoneNumberTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
            : base(dataProtectionProvider, options, logger)
        {
        }
    }

    public class ChangePhoneNumberTokenProviderOptions : DataProtectionTokenProviderOptions
    {

    }
}
