import styled, { css } from "styled-components";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  color: #fff;
  background-color: #562bf6;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 900px;
  height: 800px;
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
    height: 800px;
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
  /* width: 100%;
  border-radius: 25px;
  max-width: 420px;
  min-height: 400px;
  display: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2); */
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
  margin-top: 16px;
`;

export const TickIcon = styled(FaCheck)`
  ${(prop) =>
    prop.valid
      ? css`
          color: limegreen;
          margin-left: 0.25rem;
        `
      : css`
          display: none;
        `}
`;
export const CrossIcon = styled(FaTimes)`
  ${(prop) =>
    prop.invalid
      ? css`
          display: none;
          margin-left: 0.25rem;
        `
      : css`
          color: red;
        `}
`;
export const InfoIcon = styled(FaInfoCircle)``;

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

export const CreateButton = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 4px;
  border-radius: 8px;
  margin-top: 16px;
  padding: 10px;

  ${(prop) =>
    prop.disabled
      ? css`
          background-color: #808080;
        `
      : css`
          background-color: #562bf6;
          color: #fff;
          cursor: pointer;
          border: none;
        `}
`;

export const LLink = styled(Link)`
  color: black;
  margin-left: 5px;
`;

export const Text = styled.p`
  margin-bottom: 10px;
`;

export const Span = styled.span``;

export const Attention = styled.p`
  ${(prop) =>
    prop.attention
      ? css`
          font-size: 0.8rem;
          /* border-radius: 0.5rem;
          background: #000; */
          color: red;
          padding: 4px;
          position: relative;
          bottom: -10px;
          svg {
            margin-right: 4px;
          }
        `
      : css`
          position: absolute;
          left: -9999px;
        `}
`;
