namespace KanbanApi.Configuration.TokenLifespan
{
    public class TokenLifespanConfiguration
    {
        public int DataProtection { get; set; }
        public int Authenticator { get; set; }
        public int ChangeEmail { get; set; }
        public int ChangePhoneNumber { get; set; }
        public int PasswordReset { get; set; }
        public int EmailConfirmation { get; set; }
    }
}
