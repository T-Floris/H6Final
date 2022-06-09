import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardList from "../components/Kanban/CardList";
import AddForm from "../components/Kanban/AddList";
import {
  addCard,
  removeCard,
  addList,
  removeList,
  reOrderList,
  moveCardToList,
  setCardContent,
  setListName,
  duplicateCard,
  duplicateList,
} from "../actions/boardActions";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  height: 100vh;
  padding: 3.5rem 2rem 0 8rem;
  @media screen and (max-width: 768px) {
    padding: 8rem 0rem 0rem 1rem;
  }
`;
const BoardContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.countColumns}, 1fr);
  grid-gap: 13px;
  margin: 10px;
`;

const Board = (props) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // Dropped in the same list
      props.reOrderList(source.droppableId, source.index, destination.index);
    } else {
      // Drop in other list
      props.moveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index
      );
    }
  };
  const axiosPrivate = useAxiosPrivate();
  const url = String(window.location.pathname);
  const lastSegment = url.split("/").pop();
  const GETCARDLIST_URL = `board/${lastSegment}/Table/get`;
  const GETBOARD_URL = "board/getBoards/314ca280-18b2-4ae8-9c19-802be90697fa";
  //const BOARD_URL = `board/GetBoards/${lastSegment}/`;
  const [value, setValue] = useState();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListName = async () => {
      try {
        const response = await axiosPrivate.get(GETCARDLIST_URL, {
          signal: controller.signal,
        });
        //console.log(response.data.tables);
        //console.log(props.onAddList);
        console.log("-");
        isMounted && setTables(response.data.tables);
        console.log(tables);
        console.log("test " + props.lists);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    // const getBoard = async () => {
    //   try {
    //     console.log(BOARD_URL);
    //     const response = await axiosPrivate.get(BOARD_URL, {
    //       signal: controller.signal
    //     });

    //     isMounted && setBoard(response.data.board.board)
    //     console.log(board);
    //     // console.log("tetetetetete");
    //   }
    //   catch (err){
    //     console.log("nej");
    //     console.log(err);
    //   }
    // }

    getListName();
    // getBoard();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container>
      <BoardContainer countColumns={props.lists.length + 1}>
        <DragDropContext onDragEnd={onDragEnd}>
          {console.log("frfr")}
          {console.log(props.lists)}
          {props.lists.map((list, listIndex) => (
            <CardList
              key={tables[listIndex].tableId}
              droppableId={tables[listIndex].tableId}
              list={list}
              onChangeListName={(listName) =>
                props.onChangeListName(listIndex, listName)
              }
              onRemoveList={() => props.onRemoveList(listIndex)}
              onDuplicateList={() => props.onDuplicateList(listIndex)}
              onChangeCardContent={(cardIndex, content) =>
                props.onChangeCardContent(listIndex, cardIndex, content)
              }
              onAddCard={(cardContent) =>
                props.onAddCard(listIndex, cardContent)
              }
              onRemoveCard={(cardIndex) =>
                props.onRemoveCard(listIndex, cardIndex)
              }
              onDuplicateCard={(cardIndex) =>
                props.onDuplicateCard(listIndex, cardIndex)
              }
            />
          ))}
        </DragDropContext>
        <AddForm
          onConfirm={props.onAddList}
          placeholder="+ Add new list"
          focusPlaceholder="Enter list title"
          maxWidth="220px"
        />
      </BoardContainer>
    </Container>
  );
};

Board.propTypes = {
  reOrderList: PropTypes.func,
  moveCardToList: PropTypes.func,
  lists: PropTypes.array,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  onDuplicateList: PropTypes.func,
  onChangeCardContent: PropTypes.func,
  search: PropTypes.string,
  onAddList: PropTypes.func,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onDuplicateCard: PropTypes.func,
};
const mapStateToProps = (state) => ({
  lists: state.board.currentState.lists,
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  addCard: bindActionCreators(addCard, dispatch),
  removeCard: bindActionCreators(removeCard, dispatch),
  addList: bindActionCreators(addList, dispatch),
  removeList: bindActionCreators(removeList, dispatch),
  reOrderList: bindActionCreators(reOrderList, dispatch),
  moveCardToList: bindActionCreators(moveCardToList, dispatch),
  onChangeCardContent: bindActionCreators(setCardContent, dispatch),
  onChangeListName: bindActionCreators(setListName, dispatch),
  onRemoveList: bindActionCreators(removeList, dispatch),
  onDuplicateList: bindActionCreators(duplicateList, dispatch),
  onAddList: bindActionCreators(addList, dispatch),
  onAddCard: bindActionCreators(addCard, dispatch),
  onRemoveCard: bindActionCreators(removeCard, dispatch),
  onDuplicateCard: bindActionCreators(duplicateCard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
