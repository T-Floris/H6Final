import React, { useRef, useEffect, useCallback } from "react";

import {
  Container,
  Background,
  ModalWrapper,
  ModalImg,
  ModalContent,
  CloseModalButton,
  Hint,
  ModalTitle,
  ModalForm,
  ModalLabel,
  ModalInputField,

  ModalButtonContainer,
  ModalButton,
} from "./CreateBoardModalElementals";
import { AiOutlineLock } from "react-icons/ai";
import { IoPeopleOutline, IoEarthOutline } from "react-icons/io5";
import { useState } from "react";
import { axiosPrivate } from "../../../../api/axios";

const CreateBoardModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const [createBoard, setcreateBoard] = useState("");
  const CREATEBOARD_URL = "board/create";

  const handleSubmit = async () => {
    try {
      await axiosPrivate.post(
        CREATEBOARD_URL,
        JSON.stringify({ Name: createBoard })
      );

      setcreateBoard("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showModal ? (
        <Container>
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
              <ModalImg
                src={require("../../../../images/svg-1.svg").default}
                alt="Kanban board"
              />
              <ModalContent>
                <ModalForm>
                  <ModalTitle>Create board</ModalTitle>
                  <ModalLabel>
                    Board title<span style={{ color: "red" }}>*</span>
                  </ModalLabel>
                  <ModalInputField
                    type="text"
                    value={createBoard}
                    onChange={(e) => setcreateBoard(e.target.value)}
                    autoFocus
                    required
                  ></ModalInputField>
                
                  <ModalButtonContainer>
                    <ModalButton
                      type="submit"
                      value="Submit"
                      onClick={handleSubmit}
                    >
                      Create
                    </ModalButton>
                    <ModalButton onClick={() => setShowModal((prev) => !prev)}>
                      Cancel
                    </ModalButton>
                  </ModalButtonContainer>
                </ModalForm>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              ></CloseModalButton>
              <Hint>ESC</Hint>
            </ModalWrapper>
          </Background>
        </Container>
      ) : null}
    </>
  );
};

const Options = [
  {
    value: "Username's workspace",
    label: "Username's workspace",
  },
  {
    value: "Bob's workspace",
    label: "Bob's workspace",
  },
  {
    value: "John's workspace",
    label: "John's workspace",
  },
];
const Visibility = [
  {
    value: "Private",
    label: "Private",
    desc: "Only board members can see and edit this board.",
    icon: <AiOutlineLock />,
  },
  {
    value: "Workspace",
    label: "Workspace",
    desc: "All members of this Workspace can see and edit this board.",
    icon: <IoPeopleOutline />,
  },
  {
    value: "Public",
    label: "Public",
    desc: "Anyone and see this board. Only board members can edit",
    icon: <IoEarthOutline />,
  },
];

export default CreateBoardModal;
