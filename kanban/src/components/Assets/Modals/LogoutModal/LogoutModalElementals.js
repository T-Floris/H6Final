import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
position: relative;
z-index: 100;
`

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
  position: relative;
  width: 500px;
  height: 200px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  border-radius: 50px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }
`;


export const ModalTitle = styled.h2`
margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButton = styled.button`
  background-color: #141414;
  margin: 20px;
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
export const ModalLink = styled(Link)``
