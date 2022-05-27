import styled, { css } from "styled-components";
import {Link} from "react-router-dom"

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 0.5rem 0.5rem;
  font-size: 22px;
  color: #fff;
`;

export const Section = styled.section`
  width: 100%;
  border-radius: 25px;
  max-width: 420px;
  min-height: 400px;
  display: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Title = styled.h1`

`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
`;

export const Label = styled.label`
  margin-top: 1rem;
`;

export const CreateButton = styled.button`
  font-family: "Nunito", sans-serif;
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;

  margin-top: 1rem;

  padding: 0.5rem;
`;

export const InputField = styled.input`
  font-size: 22px;
  padding: 0.25rem;
  border-radius: 0.5rem;
`;


export const LLink = styled(Link)`
  color: #fff;

  &:visited {
    color: #fff;
  }
`;

export const Text = styled.p`
  /* font-size: 15px; */
`;

export const Span = styled.span`
  
`;

export const Attention = styled.p`
  ${(prop) =>
    prop.attention
      ? css`
          font-size: 15px;
          /* border-radius: 0.5rem;
          background: #000; */
          color: red;
          padding: 0.25rem;
          position: relative;
          bottom: -10px;
          svg {
            margin-right: 0.25rem;
          }
        `
      : css`
          position: absolute;
          left: -9999px;
        `}
`;
