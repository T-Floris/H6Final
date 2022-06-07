using System;
using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.Internal.DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public void AddCard(AddCardToTableRequest addCardToTable)
        {
            _sql.SaveData("spCard_Add", new { addCardToTable.BoardId, addCardToTable.TableId, addCardToTable.Info }, DatabaseName);
        }

        public void DeleteCard(DeleteCardFromTableRequest deleteCardFromTable)
        {
            _sql.DeleteData("spCard_Delete", new { deleteCardFromTable.BoardId, deleteCardFromTable.TableId, deleteCardFromTable.CardId }, DatabaseName);
        }

        public void MoveCard(MoveCardFromTableRequest moveCardFromTable)
        {
            _sql.DeleteData("spCard_Move", new { moveCardFromTable.CardId, moveCardFromTable.TableId }, DatabaseName);
        }

        public void UpdateCard(UpdateCardFromTableRequest updateCardFromTable)
        {
            _sql.UpdateData("spCard_Update", new { updateCardFromTable.CardId, updateCardFromTable.Info }, DatabaseName);
        }
    }
}
