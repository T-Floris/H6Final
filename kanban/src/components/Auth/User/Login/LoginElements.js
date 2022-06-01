import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  color: #fff;
  margin-top: 100px;
  /* background-color: #562bf6;
  height: 100vh; */
`;
export const Wrapper = styled.div`
  width: 900px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  @media only screen and (max-width: 678px) {
  }
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    width: 450px;
    height: 600px;
  }
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  border-radius: 10px;
  @media only screen and (max-width: 1200px) {
  }
`;

export const ErrorMsg = styled.p`
  ${(prop) =>
    prop.errorMsg
      ? css`
          color: red;
          font-weight: bold;
          padding: 8px;
          margin-bottom: 8px;
          text-align: center;
        `
      : css`
          position: absolute;
          left: -9999px;
        `}
`;
export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 16px;
`;

export const Label = styled.label`
  /* margin-top: 16px; */
`;

export const InputField = styled.input`
  font-size: 1rem;
  padding: 4px;
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;
export const LoginButton = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 4px;
  border-radius: 8px;
  margin-top: 16px;
  padding: 10px;
  background-color: #562bf6;
  color: #fff;
  cursor: pointer;
  border: none;
`;

export const CheckBoxContainer = styled.div`
  font-size: 1rem;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
export const CheckBox = styled.input`
  height: 20px;
  width: 20px;
  margin: 0 5px 4px 2px;
`;

export const LLink = styled(Link)`
  color: black;
  margin-left: 5px;
`;

export const Text = styled.p`
  margin-bottom: 10px;
`;

export const Span = styled.span``;
