using KanbanApi.Library.DTOs.Requests.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.User
{
    public interface IUserData
    {
        void Registration(RegistrationRequest registration);

        void UpdateEmail(UpdateEmailRequest updateEmail);
        void UpdateUserName(UpdateUserNameRequest updateUserName);

        void DeleteUser(DeleteUserRequest deleteUser);

        //UserModel GetUserById(string Id);



    }
}
