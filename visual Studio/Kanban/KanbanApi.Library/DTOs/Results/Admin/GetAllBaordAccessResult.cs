using KanbanApi.Library.DTOs.Responses.Admin;
using KanbanApi.Library.Models.BaordAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DTOs.Results.Admin
{
    public class GetAllBaordAccessResult : GetAllBaordAccessResponse
    {
        public List<string> Message { get; set; }
        public List<BaordAccessModel> BaordAccess { get; set; }

    }
}
