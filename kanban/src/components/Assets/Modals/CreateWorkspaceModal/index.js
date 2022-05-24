import React, { useRef, useEffect, useCallback } from "react";
import {CTAButton} from "../../ButtonElements"
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
  ModalSelect,
  ModalOption,
  ModalTextarea,
  ModalButtonContainer,
} from "./CreateWorkspaceModalElementals";

const CreateWorkspaceModal = ({ showModal, setShowModal }) => {
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
              <ModalImg
                src={require("../../../../images/svg-7.svg").default}
                alt="Kanban board"
              />
              <ModalContent>
                <ModalForm>
                  <ModalTitle>Create workspace</ModalTitle>
                  <ModalLabel>
                    Workspace title<span style={{ color: "red" }}>*</span>
                  </ModalLabel>
                  <ModalInputField type="text" autoFocus required></ModalInputField>

                  <ModalLabel>
                    Workspace type<span style={{ color: "red" }}>*</span>
                  </ModalLabel>
                  <ModalSelect>
                    {Type.map(({ label }) => (
                      <ModalOption key={label}>{label}</ModalOption>
                    ))}
                  </ModalSelect>

                  <ModalLabel>Workspace description</ModalLabel>
                  <ModalTextarea placeholder=""></ModalTextarea>

                  <ModalButtonContainer>
                    <CTAButton type="submit" value="Submit">
                      Create
                    </CTAButton>
                    <CTAButton onClick={() => setShowModal((prev) => !prev)}>
                      Cancel
                    </CTAButton>
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

const Type = [
  {
    value: "education",
    label: "Education",
  },
  {
    value: "human Resources",
    label: "Human Resources",
  },
  {
    value: "engineering-IT",
    label: "Engineering-IT",
  },
  {
    value: "operations",
    label: "Operations",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "sales CRM",
    label: "Sales CRM",
  },
  {
    value: "small Business",
    label: "Small Business",
  },
  {
    value: "other",
    label: "Other",
  },
];

export default CreateWorkspaceModal;
