import styled from "styled-components";

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
export const TextLabel = styled.label``;

export const TextInput = styled.input`
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: 300px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;

export const EditField = styled.div`
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: 300px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  vertical-align: center;
  &:focus {
    border: 3px solid;
    border-color: #562bf6;
    outline: none;
  }
`;
