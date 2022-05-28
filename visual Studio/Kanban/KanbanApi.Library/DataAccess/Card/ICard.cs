using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Card
{
    public interface ICard
    {
        void AddCard();
        void DeleteCard();
        void UpdateCard();
        void MoveCard();
    }
}
