using System;
using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.Internal.DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KanbanApi.Library.Models.Card;

namespace KanbanApi.Library.DataAccess.Card
{
    public class Card : ICard
    {
        private readonly ISqlDataAccess _sql;
        private string DatabaseName = "KanbanData";

        public Card(ISqlDataAccess sql)
        {
            _sql = sql;
        }

        public CardModel AddCard(AddCardToTableRequest addCardToTable)
        {
            var card = _sql.SaveData<CardModel, dynamic>("spCard_Add", new { addCardToTable.BoardId, addCardToTable.TableId, addCardToTable.Info }, DatabaseName).FirstOrDefault();
            return card;
        }

        public void DeleteCard(DeleteCardFromTableRequest deleteCardFromTable)
        {
            _sql.DeleteData("spCard_Delete", new { deleteCardFromTable.BoardId, deleteCardFromTable.TableId, deleteCardFromTable.CardId }, DatabaseName);
        }

        public List<CardModel> GetAllInTable(GetCardsInTableRequest getCardInTable)
        {
            var cards = _sql.LoadData<CardModel, dynamic>("spCard_GetAllInTable", new { getCardInTable.BoardId, getCardInTable.TableId }, DatabaseName);
            return cards;
        }

        public CardModel GetCardInTableById(GetCardInTableByIdRequest getCardInTableById)
        {
            var card = _sql.LoadData<CardModel, dynamic>("spCard_GetCardInTableById", new { getCardInTableById.BoardId, getCardInTableById.TableId, getCardInTableById.CardId }, DatabaseName).FirstOrDefault();
            return card;
        }

        public void MoveCard(MoveCardFromTableRequest moveCardFromTable)
        {
            _sql.DeleteData("spCard_Move", new { moveCardFromTable.BoardId, moveCardFromTable.CardId, moveCardFromTable.TableId, moveCardFromTable.NewPosition, moveCardFromTable.NewTableId }, DatabaseName);
        }

        public void UpdateCard(UpdateCardFromTableRequest updateCardFromTable)
        {
            _sql.UpdateData("spCard_Update", new { updateCardFromTable.CardId, updateCardFromTable.Info }, DatabaseName);
        }
    }
}
