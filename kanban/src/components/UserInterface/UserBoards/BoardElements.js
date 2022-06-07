import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export const Container = styled.div`
  position: relative;
  height: 100vh;
  padding: 3.5rem 2rem 0 8rem;
  @media screen and (max-width: 768px) {
    padding: 8rem 0rem 0rem 1rem;
  }
`;
Container.displayName = "Container";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
Wrapper.displayName = "Wrapper";

export const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 6px;
`;

export const BoxLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  /* background:${({ theme }) => theme.bg3}; */
  width: 200px;
  height: 150px;
  border-radius: 5px;
  margin: 50px 10px 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  background: red;
  &:hover {
    background: #091e421a;
    transition: 0.5s;
  }
`;

export const TextInBox = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
`;

export const BoxButton = styled.button`
  background: #091e420a;
  margin: 50px 10px 20px 50px;
  width: 200px;
  height: 150px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 1s;
  &:hover {
    background: #091e421a;
    transition: 1s;
  }
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
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
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

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
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
`;
