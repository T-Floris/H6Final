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
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";
import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UserBoards = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [boards, setBoards] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const GETBOARD_URL = "board/getBoards";

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBoards = async () => {
      try {
        const response = await axiosPrivate.get(GETBOARD_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setBoards(response.data.boards);
      } catch (err) {
        // console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getBoards();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <PageBar>
          <Title>Username boards</Title>
        </PageBar>

        <Wrapper>

          {boards.map((board, index) => (
            <BoxLink key={index} to={"/boards/"+board.id}>
              <TextInBox>{board.name}</TextInBox>
            </BoxLink>
          ))}{" "}

          <BoxButton onClick={openModal}>
            <TextInBox>Create new board</TextInBox>
          </BoxButton>
          
        </Wrapper>
      </Container>
    </>
  );
};
export default UserBoards;
