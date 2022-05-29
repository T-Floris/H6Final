using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Requests.Search;
using KanbanApi.Library.Internal.DataAccess;
using KanbanApi.Library.Models.User;
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
        private string DatabaseName = "KanbanData";

        public UserData(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public void DeleteUser(DeleteUserRequest deleteUser)
        {
            _sql.DeleteData("spUser_Delete", new { }, DatabaseName);
        }

        public UserModel GetUserById(string Id)
        {
            var output = _sql.LoadData<UserModel, dynamic>("dbo.spUser_Select", new { Id }, DatabaseName).FirstOrDefault();
            return output;
        }

        public void Registration(RegistrationRequest registration)
        {
            /// save data in database
            _sql.SaveData("spUser_Registration", new { registration.Id, registration.FirstName, registration.LastName, registration.EmailAddress, registration.UserName, DatabaseName, registration.CreatedDate}, DatabaseName);
        }


        public void UpdateEmail(ChangeEmailRequest updateEmail)
        {
            _sql.UpdateData("spUser_UpdateEmail", new { updateEmail.UserId, updateEmail.NewEmailAddress }, DatabaseName);
        }

        public void UpdateUserName(ChangeUserNameRequest updateUserName)
        {
            _sql.UpdateData("spUser_UpdateUserName", new {updateUserName.Id, updateUserName.UserName }, DatabaseName);
        }
    }
}
