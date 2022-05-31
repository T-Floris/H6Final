import React, { useRef, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthProvider";

import {
  Container,
  Background,
  ModalWrapper,
  ModalContent,
  ModalTitle,
  ModalButtonContainer,
  ModalButton,
  // ModalLink,
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

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/");
    console.log("logout");
  };

  return (
    <>
      {showModal ? (
        <Container>
          <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <ModalTitle>Logout?</ModalTitle>

                <ModalButtonContainer>
                  {/* <ModalLink to="/"> */}
                    <ModalButton onClick={logout}>
                      Yes
                    </ModalButton>
                  {/* </ModalLink> */}
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
