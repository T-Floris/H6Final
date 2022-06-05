using KanbanApi.Library.DTOs.Requests.Auth;
using KanbanApi.Library.DTOs.Requests.Search;
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
        //List<UserModel> SearchForUser(SearchUserRequest searchUser);
        UserModel GetUserById(string Id);
        void UpdateEmail(ChangeEmailRequest updateEmail);
        void UpdateUserName(ChangeUserNameRequest updateUserName);

        void UpdateUser(string id, string fristName, string lastName);

        //void ForgotPassword(ForgotPasswordRequest forgotPassword);


        //UserModel GetUserById(string Id);



    }
}
