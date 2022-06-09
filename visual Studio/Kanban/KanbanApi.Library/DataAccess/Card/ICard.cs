using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.Models.Card;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.DataAccess.Card
{
    public interface ICard
    {
        List<CardModel> GetAllInTable(GetCardsInTableRequest getCardInTable);
        CardModel GetCardInTableById(GetCardInTableByIdRequest getCardInTableById);
        CardModel AddCard(AddCardToTableRequest addCardToTable);
        void DeleteCard(DeleteCardFromTableRequest deleteCardFromTable);
        void UpdateCard(UpdateCardFromTableRequest updateCardFromTable);
        void MoveCard(MoveCardFromTableRequest moveCardFromTable);
    }
}
