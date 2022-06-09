import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CardListHeader as StyledCardListHeader } from "./CardListHeaderElements";
import ContentEditable from "../ContentEditable";
import IconButton from "../IconButton";
import * as UtilsHelper from "../../../helpers/utils";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useParams } from "react-router-dom";

const CardListHeader = (props) => {
  const ref = useRef(null);

  const [onHover, setOnHover] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState(props.listName);

  useEffect(() => {
    setListName(props.listName);
  }, [props.listName]);

  const onClickSaveEdit = () => {
    if (editMode) {
      props.onChangeListName(listName);
    }
    setEditMode((isEditing) => !isEditing);
  };

  useEffect(() => {
    if (editMode) {
      UtilsHelper.focusCursorToEnd(ref);
    }
  }, [editMode]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.stopPropagation();
      e.preventDefault();
      setEditMode(false);
      ref.current.blur();
      const name = ref.current.innerText;
      props.onChangeListName(name);
    }
  };

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

  // const url = String(window.location.pathname);
  // const lastSegment = url.split("/").pop();
  // const GETCARDLIST_URL = `board/${lastSegment}/Table/get`;

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getListName = async () => {
  //     try {
  //       const response = await axiosPrivate.get(GETCARDLIST_URL, {
  //         signal: controller.signal,
  //       });
  //       // console.log(response.data);
  //       isMounted && props.listName(response.data);
  //     } catch (err) {
  //       console.error(err);
  //       // navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getListName();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
    <StyledCardListHeader
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      >
      <ContentEditable
        innerRef={ref}
        html={listName}
        onChange={(e) => setListName(e.target.value)}
        onFocus={() => setEditMode(true)}
        onKeyDown={handleKeyDown}
        style={{ paddingRight: 24 }}
      />
      {(onHover || editMode) && (
        <IconButton.ButtonContainer
          top="11px"
          right={editMode ? "11px" : "42px"}
          >
          <IconButton
            onClick={onClickSaveEdit}
            iconType={editMode ? "confirm" : "edit"}
            />
        </IconButton.ButtonContainer>
      )}
      {onHover && !editMode && (
        <>
          <IconButton.ButtonContainer top="11px" right="22px">
            <IconButton onClick={props.onDuplicateList} iconType="copy" />
          </IconButton.ButtonContainer>
          <IconButton.ButtonContainer top="11px" right="3px">
            <IconButton onClick={props.onRemoveList} iconType="delete" />
          </IconButton.ButtonContainer>
        </>
      )}
    </StyledCardListHeader>
    </>
  );
};

CardListHeader.propTypes = {
  listName: PropTypes.string,
  onChangeListName: PropTypes.func,
  onRemoveList: PropTypes.func,
  onDuplicateList: PropTypes.func,
};

export default CardListHeader;

// const CardListHeader = (props) => {
//   const ref = useRef(null);

//   const [onHover, setOnHover] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [listName, setListName] = useState(props.listName);

//   useEffect(() => {
//     setListName(props.listName);
//   }, [props.listName]);

//   const onClickSaveEdit = () => {
//     if (editMode) {
//       props.onChangeListName(listName);
//     }
//     setEditMode((isEditing) => !isEditing);
//   };

//   useEffect(() => {
//     if (editMode) {
//       UtilsHelper.focusCursorToEnd(ref);
//     }
//   }, [editMode]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === "Tab") {
//       e.stopPropagation();
//       e.preventDefault();
//       setEditMode(false);
//       ref.current.blur();
//       const name = ref.current.innerText;
//       props.onChangeListName(name);
//     }
//   };
//   return (
//     <StyledCardListHeader
//       onMouseEnter={() => setOnHover(true)}
//       onMouseLeave={() => setOnHover(false)}
//     >
//       <ContentEditable
//         innerRef={ref}
//         html={listName}
//         onChange={(e) => setListName(e.target.value)}
//         onFocus={() => setEditMode(true)}
//         onKeyDown={handleKeyDown}
//         style={{ paddingRight: 24 }}
//       />
//       {(onHover || editMode) && (
//         <IconButton.ButtonContainer
//           top="11px"
//           right={editMode ? "11px" : "42px"}
//         >
//           <IconButton
//             onClick={onClickSaveEdit}
//             iconType={editMode ? "confirm" : "edit"}
//           />
//         </IconButton.ButtonContainer>
//       )}
//       {onHover && !editMode && (
//         <>
//           <IconButton.ButtonContainer top="11px" right="22px">
//             <IconButton onClick={props.onDuplicateList} iconType="copy" />
//           </IconButton.ButtonContainer>
//           <IconButton.ButtonContainer top="11px" right="3px">
//             <IconButton onClick={props.onRemoveList} iconType="delete" />
//           </IconButton.ButtonContainer>
//         </>
//       )}
//     </StyledCardListHeader>
//   );
// };
