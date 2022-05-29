import styled from "styled-components";
import { CTAButton } from "../../../../Assets/ButtonElements";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Container = styled.div``;
export const Title = styled.h1`
  text-align: center;
  margin: 40px 0 40px 0;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const PasswordLabel = styled.label``;
export const PasswordInput = styled.input`
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: 300px;
  height: 50px;
  margin-bottom: 40px;
  padding: 10px;
  margin-right: -40px;
  padding-right: 35px;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;
export const ShowPasswordBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: inherit;
  vertical-align: middle;
  svg {
    font-size: 25px;
  }
`;

export const Eye = styled(AiOutlineEye)``;
export const EyeInvisible = styled(AiOutlineEyeInvisible)``;

export const SubmitButton = styled(CTAButton)`
  width: 200px;
`;
