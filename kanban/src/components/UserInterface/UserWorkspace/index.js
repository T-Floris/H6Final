import React, { useState } from "react";
import {
  Container,
  Title,
  TextInBox,
  Wrapper,
  BoxLink,
  BoxButton,
} from "./WorkspaceElements";
import Modal from "../../Assets/Modals/CreateGroupModal";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";

const UserWorkspace = () => {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <PageBar>
          <Title>Username workspaces</Title>
        </PageBar>
        <Wrapper>
          <BoxLink to="/boards">
            <TextInBox>Username workspace</TextInBox>
          </BoxLink>

          <BoxButton onClick={openModal}>
            <TextInBox>Create new workspace</TextInBox>
          </BoxButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default UserWorkspace;
