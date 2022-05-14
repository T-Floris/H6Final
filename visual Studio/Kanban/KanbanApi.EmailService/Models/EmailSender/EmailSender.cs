using KanbanApi.EmailService.Configuration;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using MimeKit.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.EmailService.Models.EmailSender
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfiguration;

        public EmailSender(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }

        #region varbles

        /// <summary>
        /// 1. gets the curent path
        /// 2. exit folder and enter the MailTemplates folder
        /// </summary>
        private readonly string emailPath = Path.Combine(Environment.CurrentDirectory, @"..\KNBNApi.EmailService\MailTemplates\");

        /// <summary>
        /// Pathe to image (stordt on googel drive)
        /// </summary>
        private string logoimage = "https://lh3.googleusercontent.com/pw/AM-JKLWEFVuQ7TRAq0RmwSlo7AP4poyT3Fp_YzWlYNQKSXLcHGfFxCGmzwkLQxlrCmIoJT8bRlYZsw3PgiUFPpiFpMjJKeTuL5TBoFZ2rCTGhalAesEUWnRwdnl_rtvlF5hURI3xiuuq-qLEZ2busOdhh8A=s350-no?authuser=0";
        
        /// <summary>
        /// default path to webside
        /// </summary>
        private readonly string knbnLink = "http://localhost:3000/";

        /// <summary>
        /// name of the Organisation
        /// </summary>
        private readonly string organisationName = "KNBN";

        /// <summary>
        /// path to unsubscribe on the webside
        /// </summary>
        private readonly string unsubscribe = "http://localhost:3000/unsubscribe";
        /// <summary>
        /// the address of the organisation
        /// </summary>
        private readonly string address = "TEC. Telegrafvej 9 2750 Ballerup";

        #endregion

        #region ConfirmEmail / Welcome

        /// <summary>
        /// sending an email to user with a link containing a token
        /// this link will update "EmailConfirmed" from falsh to true
        /// </summary>
        /// <param name="message">the message to send</param>
        /// <param name="existingUser">the user to send the email to</param>
        /// <returns></returns>
        public async Task ConfirmEmailAsync(Message message, IdentityUser existingUser)
        {
            /// seding up the email.
            var confirmEmail = ConfirmEmailMessage(message, existingUser);

            /// sending the email
            await SendAsync(confirmEmail);
        }

        /// <summary>
        /// setting up the email to the user
        /// </summary>
        /// <param name="message">the message to send</param>
        /// <param name="existingUser">the user to send the email to</param>
        /// <returns></returns>
        private MimeMessage[] ConfirmEmailMessage(Message message, IdentityUser existingUser)
        {
            /// setup array of MimeMessage and set the length of it
            MimeMessage[] emailsToSend = new MimeMessage[message.To.Count];

            /// send email to all user in array
            foreach (var to in message.To.Select((value, email) => new { email, value }))
            {
                try
                {
                    /// statr a message
                    var emailMessage = new MimeMessage();
                    /// set the sender of the email
                    emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
                    /// set the recipient of the message
                    emailMessage.To.Add(message.To[to.email]);
                    /// the subject fildt in the email
                    emailMessage.Subject = message.Subject;


                    var bodyBuilder = new BodyBuilder();

                    /// setup the email type
                    string pathToFile = emailPath + "Welcome_EmailTemplate.html";
                    /// set the HtmlBody to the "pathToFile" file
                    bodyBuilder.HtmlBody = File.OpenText(pathToFile).ReadToEnd();

                    /// descrip the action user have requested
                    string action = "Create user";
                    /// get the token
                    string token = message.Link;

                    /// the title of the email
                    string title = "test";
                    /// a shot text descriping the title
                    string preheader = "test";

                    /// build the email and replace all values in  in "{}" with the given value
                    bodyBuilder.HtmlBody = string.Format(bodyBuilder.HtmlBody,
                        title, /// the title of the email
                        preheader, /// a shot text descriping the title
                        knbnLink, /// link to webside
                        logoimage, /// link to image
                        existingUser.UserName, /// the username
                        organisationName, /// name of the organisation
                        token, /// token
                        action, /// action
                        unsubscribe, /// link to unsubscribe
                        address /// organisations address
                        );

                    /// set the body of 
                    emailMessage.Body = new TextPart("html")
                    {
                        ///
                        Text = bodyBuilder.HtmlBody
                    };

                    ///
                    emailMessage.Body = bodyBuilder.ToMessageBody();

                    ///
                    emailsToSend[to.email] = emailMessage;
                }
                catch (Exception)
                {
                    throw;
                }
            }

            /// 
            return emailsToSend;
        }

        #endregion

        /// <summary>
        /// sending email
        /// </summary>
        /// <param name="mailMessage">all info the email contin</param>
        /// <returns></returns>
        private async Task SendAsync(MimeMessage[] mailMessage)
        {
            /// setup the mail client 
            using var client = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                /// connet to the mail server
                await client.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                /// log in to the mail server
                await client.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);

                /// sending mail to all in email ther are in the arry
                foreach (var sendmail in mailMessage)
                {
                    await client.SendAsync(sendmail);
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                /// Disconnect conation to the server
                await client.DisconnectAsync(true);
                /// Dispose of the mail client
                client.Dispose();
            }
        }

    }
}
