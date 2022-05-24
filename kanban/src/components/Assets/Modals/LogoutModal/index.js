import React, { useRef, useEffect, useCallback } from "react";

import {
  Container,
  Background,
  ModalWrapper,
  ModalContent,
  ModalTitle,
  ModalButtonContainer,
  ModalButton,
  ModalLink,
} from "./LogoutModalElementals";

const LogoutModal = ({ showModal, setShowModal }) => {
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

  return (
    <>
      {showModal ? (
        <Container>
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <ModalTitle>Logout?</ModalTitle>

                <ModalButtonContainer>
                  <ModalLink to="/">
                    <ModalButton type="submit" value="Submit">
                      Yes
                    </ModalButton>
                  </ModalLink>
                  <ModalButton onClick={() => setShowModal((prev) => !prev)}>
                    No
                  </ModalButton>
                </ModalButtonContainer>
              </ModalContent>
            </ModalWrapper>
          </Background>
        </Container>
      ) : null}
    </>
  );
};

export default LogoutModal;
