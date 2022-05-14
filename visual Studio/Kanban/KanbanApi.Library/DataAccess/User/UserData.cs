using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.Internal.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.User
{
    public class UserData : IUserData
    {
        private readonly ISqlDataAccess _sql;

        public UserData(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public void DeleteUser(DeleteUserRequest deleteUser)
        {
            throw new NotImplementedException();
        }

        public void Registration(RegistrationRequest registration)
        {
            _sql.SaveData("spUser_Registration", new { registration.Id, registration.FirstName, registration.LastName, registration.EmailAddress, registration.UserName, registration.Avatar}, "KanbanData");
        }

        public void UpdateEmail(UpdateEmailRequest updateEmail)
        {
            throw new NotImplementedException();
        }

        public void UpdateUserName(UpdateUserNameRequest updateUserName)
        {
            throw new NotImplementedException();
        }
    }
}
