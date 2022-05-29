import React, { useState } from "react";
import {
  Container,
  Title,
  TextInBox,
  Wrapper,
  BoxLink,
  BoxButton,
} from "./BoardElements";
import Modal from "../../Assets/Modals/CreateBoardModal";
import { PageBar } from "../../Layout/CurrentPageBar/CurrentPageBarElements";

const UserBoard = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <PageBar>
          <Title>Username boards</Title>
        </PageBar>

        <Wrapper>
          <BoxLink to="/templateboard">
            <TextInBox>Template board</TextInBox>
          </BoxLink>

          <BoxButton onClick={openModal}>
            <TextInBox>Create new board</TextInBox>
          </BoxButton>
        </Wrapper>
      </Container>
    </>
  );
};
export default UserBoard;
