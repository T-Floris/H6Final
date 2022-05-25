import styled from "styled-components";
import { CTAButton } from "../../../../Assets/ButtonElements";

export const Container = styled.div``;
export const Title = styled.h1`
  text-align: center;
  margin: 40px 0 40px 0;
`;
export const Text = styled.p`
  margin: 40px 0 40px 0;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const EmailInput = styled.input`
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

export const SubmitButton = styled(CTAButton)`
  width: 200px;
`;
export const UnsubscribeButton = styled.button`
  margin-top: 50px;
  border: none;
  color: red;
  background-color: inherit;
  cursor: pointer;
`;
