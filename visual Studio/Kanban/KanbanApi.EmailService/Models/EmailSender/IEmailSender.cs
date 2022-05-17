using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.EmailService.Models.EmailSender
{
    public interface IEmailSender
    {
        Task ResetPasswordEmailAsync(Message message);
        Task ChangeEmailAsync(Message message);
        Task ConfirmEmailAsync(Message message, IdentityUser existingUser);





        Task FirstTimeLoggedInFromIpEmailAsync(Message message, IdentityUser existingUser, string ip);

    }
}
