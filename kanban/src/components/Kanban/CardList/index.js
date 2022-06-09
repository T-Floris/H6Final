import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card";
import { CardListContainer, CardListWrapper } from "./CardListElements";
import CardListHeader from "../CardListHeader";
import AddCard from "../AddCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CardList = (props) => {
  const axiosPrivate = useAxiosPrivate();

  // const [boards, setBoards] = useState([]);
  // const GETBOARD_URL = "board/getBoards";
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getBoards = async () => {
  //     try {
  //       const response = await axiosPrivate.get(GETBOARD_URL, {
  //         signal: controller.signal,
  //       });
  //       console.log(response.data);
  //       isMounted && setBoards(response.data.boards);
  //     } catch (err) {
  //       // console.error(err);
  //       // navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getBoards();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  // const GETCARDLIST_URL = `board/${boards.id}/Table/get`;
  // const [cardList, setCardList] = useState([]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getCardList = async () => {
  //     try {
  //       const response = await axiosPrivate.get(GETCARDLIST_URL, {
  //         signal: controller.signal,
  //       });
  //       //console.log(response.data);
  //       isMounted && setCardList(response.data);
  //     } catch (err) {
  //       // console.error(err);
  //       // navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getCardList();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);
  
  return (
    
    
    <CardListWrapper>
      {console.log("CardList")}
      {console.log(CardList)} 
      {console.log("2")}
      {console.log("2")}
      {console.log(props)}
      <CardListHeader
        listName={props.list.name}
        onChangeListName={props.onChangeListName}
        onRemoveList={props.onRemoveList}
        onDuplicateList={props.onDuplicateList}
      />
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <CardListContainer
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onChangeCardContent={(content) =>
                  props.onChangeCardContent(index, content)
                }
                onRemoveCard={() => props.onRemoveCard(index)}
                onDuplicateCard={() => props.onDuplicateCard(index)}
              />
            ))}
            {provided.placeholder}
            <AddCard
              onConfirm={props.onAddCard}
              id = {props.droppableId}
              placeholder="+ Add new card"
              focusPlaceholder="Enter card content"
            />
          </CardListContainer>
        )}
      </Droppable>
    </CardListWrapper>
  );
};

CardList.propTypes = {
  list: PropTypes.object,
  onChangeCardContent: PropTypes.func,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  droppableId: PropTypes.string,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onDuplicateCard: PropTypes.func,
  onDuplicateList: PropTypes.func,
};
export default CardList;

{/* <CardListWrapper>
      <CardListHeader
        listName={props.list.name}
        onChangeListName={props.onChangeListName}
        onRemoveList={props.onRemoveList}
        onDuplicateList={props.onDuplicateList}
      />
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <CardListContainer
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onChangeCardContent={(content) =>
                  props.onChangeCardContent(index, content)
                }
                onRemoveCard={() => props.onRemoveCard(index)}
                onDuplicateCard={() => props.onDuplicateCard(index)}
              />
            ))}
            {provided.placeholder}
            <AddForm
              onConfirm={props.onAddCard}
              placeholder="+ Add new card"
              focusPlaceholder="Enter card content"
            />
          </CardListContainer>
        )}
      </Droppable>
    </CardListWrapper> */}