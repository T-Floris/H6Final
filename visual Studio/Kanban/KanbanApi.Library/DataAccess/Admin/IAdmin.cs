using KanbanApi.Library.DTOs.Requests.Admin;
using KanbanApi.Library.Models.BaordAccess;
using KanbanApi.Library.Models.GroupAccess;
using KanbanApi.Library.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Admin
{
    public interface IAdmin
    {
        List<UserModel> GetAllUsers();

        void CreatBaordAccess(CreateBaordAccessRequest creatBaordAccess);
        void DeleteBoardAccess(Guid Id);
        void UpdateBoardAccess(UpdateBoardAccessRequest updateBoardAccess);
        List<BaordAccessModel> GetAllBaordAccess();
        BaordAccessModel GetBaordAccess(GetBaordAccessRequest getBaordAccess);

        GroupAccessModel CreatGroupAccess(CreateGroupAccessRequest creatGroupAccess);
        void DeleteGroupAccess(Guid Id);
        void UpdateGroupAccess(UpdateGroupAccessRequest updateGroupAccess);
        List<GroupAccessModel> GetAllGroupAccess();
        GroupAccessModel GetGroupAccess(Guid Id);



    }
}
