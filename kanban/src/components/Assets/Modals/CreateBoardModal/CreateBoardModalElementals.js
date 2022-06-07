import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const Container = styled.div`
  position: relative;
  z-index: 100;
`;
export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 900px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
  }
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    width: 400px;
    height: 600px;
  }
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  border-radius: 10px;
  p {
    margin-bottom: 1rem;
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  transition: 1s;
  border: 3px solid;
  border-radius: 50%;
  &:hover {
    color: #562bf6;
    transition: 1s;
  }
`;

export const Hint = styled.span`
  position: absolute;
  top: 55px;
  right: 21px;
  width: 32px;
  height: 32px;
  font-weight: 700;
  cursor: default;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
  padding: 10px;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ModalLabel = styled.label``;

export const ModalInputField = styled.input`
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: 300px;
  height: 50px;
  margin-bottom: 40px;
  padding: 10px;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButton = styled.button`
  background-color: #141414;
  margin: 10px;
  color: #fff;
  border-radius: 50px;
  border: none;
  height: 50px;
  width: 100px;
  cursor: pointer;
  transition: 1s;
  :hover {
    background: #562bf6;
    transition: 1s;
  }
`;
