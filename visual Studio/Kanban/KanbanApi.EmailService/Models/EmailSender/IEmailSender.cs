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
        Task ConfirmEmailAsync(Message message, IdentityUser existingUser);
    }
}
