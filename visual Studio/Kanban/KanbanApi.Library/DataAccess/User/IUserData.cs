using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.User
{
    public interface IUserData
    {
        void DeleteUser(DeleteUserRequest deleteUser);
        void Registration(RegistrationRequest registration);
        List<UserModel> SearchForUser(string userName);
        UserModel GetUser(string Id);
        void UpdateEmail(ChangeEmailRequest updateEmail);
        void UpdateUserName(ChangeUserNameRequest updateUserName);


        //void ForgotPassword(ForgotPasswordRequest forgotPassword);


        //UserModel GetUserById(string Id);



    }
}
