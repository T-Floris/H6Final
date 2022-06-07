﻿using KanbanApi.Data;
using KanbanApi.Library.DataAccess.Board;
using KanbanApi.Library.DataAccess.Card;
using KanbanApi.Library.DataAccess.Group;
using KanbanApi.Library.DataAccess.Table;
using KanbanApi.Library.DTOs.Requests.Card;
using KanbanApi.Library.DTOs.Responses.Card;
using KanbanApi.Library.DTOs.Results.Card;
using KanbanApi.Library.Models.Board;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace KanbanApi.Controllers
{
    [Route("api/board/{boardId}/Table/{tableId}/[controller]")]
    [Authorize]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly IBoard _board;
        private readonly IGroup _group;
        private readonly ITable _table;
        private readonly ICard _card;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public CardController(IBoard board, IGroup group, ITable table, ICard card, ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _board = board;
            _group = group;
            _table = table;
            _card = card;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("create")]
        public IActionResult CreateCard(Guid boardId, Guid tableId, [FromBody] AddCardToTableRequest addCardToTable)
        {

            addCardToTable.BoardId = boardId;
            addCardToTable.TableId = tableId;

            if (TryValidateModel(addCardToTable))
            {
                //var UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                //var groups = _group.GetAllGroupUserIsMemberOff(UserId);

                //List<BoardModel> boards = new List<BoardModel>();

                //foreach (var group in groups)
                //{
                //    boards.Add(_board.GetBoardGroupIsMemberOff(group.GroupId, boardId));
                //}

                //if (boards)
                //{

                //}


                _card.AddCard(addCardToTable);

                return Ok(new AddCardToTableResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "new card created"
                    }
                });


            }



            return BadRequest(new AddCardToTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpDelete]
        [Route("delete/{cardId}")]
        public IActionResult DelateCard(Guid boardId, Guid tableId, Guid cardId, DeleteCardFromTableRequest deleteCardFromTable)
        {
            

            deleteCardFromTable.BoardId = boardId;
            deleteCardFromTable.TableId = tableId;
            deleteCardFromTable.CardId = cardId;

            if (TryValidateModel(deleteCardFromTable))
            {
                _card.DeleteCard(deleteCardFromTable);

                return Ok(new DeleteCardFromTableResult()
                {
                    IsSuccess = true,
                    Message = new List<string>()
                    {
                        "Delete"
                    }
                });
            }

            return BadRequest(new DeleteCardFromTableResponse()
            {
                Errors = new List<string>()
                {
                    "Invalid payload"
                },
                IsSuccess = false
            });
        }

        [HttpPut]
        [Route("update/{cardId}")]
        public IActionResult UpdateCard(Guid boardId, Guid tableId, Guid cardId)
        {

            UpdateCardFromTableRequest updateCardFromTable = new();

            updateCardFromTable.BoardId= boardId;
            updateCardFromTable.TableId= tableId;
            updateCardFromTable.CardId= cardId;

            if (TryValidateModel(updateCardFromTable))
            {
                _card.UpdateCard(updateCardFromTable);
            }

            return BadRequest(new UpdateCardFromTableResponse()
            {
                IsSuccess= true,
                Errors = new List<string>()
                {
                    "Invalid payload"
                }

            });
        }
    }
}