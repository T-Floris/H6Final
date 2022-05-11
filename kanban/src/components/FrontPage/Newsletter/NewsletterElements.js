import styled from "styled-components";


export const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 20px;
  @media only screen and (max-width: 380px) {
    font-size: 2.5rem;
  }
`;
export const Desc = styled.div`
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 20px;
  @media only screen and (max-width: 380px) {
    text-align: center;
    font-size: 0.9rem;
  }
`;
export const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  margin-top: 20px;
  @media only screen and (max-width: 380px) {
    width: 80%;
  }
`;
export const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;
export const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #562bf6;
  color: white;
  cursor: pointer;

`;