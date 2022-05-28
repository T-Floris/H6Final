using KanbanApi.Library.DTOs.Requests.Admin;
using KanbanApi.Library.Internal.DataAccess;
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
    public class Admin : IAdmin
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";

        public Admin(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public void CreatBaordAccess(CreateBaordAccessRequest creatBaordAccess)
        {            
            _sql.SaveData("spBoardAccess_Create", new { creatBaordAccess.Name, creatBaordAccess.Description }, DatabaseName);
        }

        public GroupAccessModel CreatGroupAccess(CreateGroupAccessRequest creatGroupAccess)
        {
              var ga =_sql.SaveData<GroupAccessModel, dynamic>("spGroupAccess_Create", new { creatGroupAccess.Name, creatGroupAccess.Description }, DatabaseName).FirstOrDefault();
              return ga;
        }

        public void DeleteBoardAccess(Guid Id)
        {
            _sql.DeleteData("spBoardAccess_Delete", new { Id }, DatabaseName);
        }

        public void DeleteGroupAccess(Guid Id)
        {
            _sql.DeleteData("spGroupAccess_Delete", new { Id }, DatabaseName);
        }

        public List<BaordAccessModel> GetAllBaordAccess()
        {
            var boardAccess = _sql.LoadData<BaordAccessModel, dynamic>("spBoardAccess_Get", new { }, DatabaseName);
            return boardAccess;
        }

        public List<GroupAccessModel> GetAllGroupAccess()
        {
            var groupAccess = _sql.LoadData<GroupAccessModel, dynamic>("spGroupAccess_GetAll", new { }, DatabaseName);
            return groupAccess;
        }



        public List<UserModel> GetAllUsers()
        {
            var output = _sql.LoadData<UserModel, dynamic>("dbo.spUser_GetAll", new {  }, DatabaseName);
            return output;
        }



        public BaordAccessModel GetBaordAccess(CreateBaordAccessRequest creatBaordAccess)
        {
            var groupAccess = _sql.LoadData<BaordAccessModel, dynamic>("spBoardAccess_Get", new { }, DatabaseName).FirstOrDefault();
            return groupAccess;

        }

        public BaordAccessModel GetBaordAccess(GetBaordAccessRequest getBaordAccess)
        {
            var boardAccess = _sql.LoadData<BaordAccessModel, dynamic>("", new { }, DatabaseName).FirstOrDefault();
            return boardAccess;
        }

        public GroupAccessModel GetGroupAccess(CreateGroupAccessRequest creatGroupAccess)
        {
            var groupAccess = _sql.LoadData<GroupAccessModel, dynamic>("spGroupAccess_Get", new { }, DatabaseName).FirstOrDefault();
            return groupAccess;

        }

        public GroupAccessModel GetGroupAccess(Guid Id)
        {
            var groupAccess = _sql.LoadData<GroupAccessModel, dynamic>("spGroupAccess_Get", new { Id }, DatabaseName).FirstOrDefault();
            return groupAccess;
        }

        public void UpdateBoardAccess(UpdateBoardAccessRequest updateBoardAccess)
        {
            _sql.UpdateData("spBoardAccess_Update", new { updateBoardAccess.Id, updateBoardAccess.Name, updateBoardAccess.Description }, DatabaseName);
        }

        public void UpdateGroupAccess(UpdateGroupAccessRequest updateGroupAccess)
        {
            _sql.UpdateData("spGroupAccess_Update", new { updateGroupAccess.Id, updateGroupAccess.Name, updateGroupAccess.Description }, DatabaseName);
        }
    }
}
