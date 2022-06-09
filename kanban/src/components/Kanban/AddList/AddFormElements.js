import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;
export const AddButtonForm = styled.form`
  max-width: ${(props) => props.maxWidth};
  min-width: 154px;
  font-size: 14px;
  height: 41px;
  display: flex;
  position: relative;
`;
export const Input = styled.input`
  background-color: ${({ theme }) => theme.bg};
  border-radius: 3px;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text};
  float: left;
  font-size: 13px;
  height: 32px;
  line-height: 19px;
  margin: 0;
  outline: none;
  padding-left: 8px;
  padding-right: 30px;
  transition: width 0.15s;
  width: 100%;
  cursor: pointer;

  ::placeholder {
    color: ${({ theme }) => theme.text};
  }

  &:focus {
    cursor: unset;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
  }
`;
export const InputContainer = styled.div`
  position: relative;
  width: ${(props) => props.width || "80%"};
`;

export const IconWrapper = styled.span`
  position: absolute;
  right: 7px;
  top: 7px;
`;
