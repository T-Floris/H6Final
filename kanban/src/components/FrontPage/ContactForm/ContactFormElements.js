import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 100vh;
`;
export const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 5% 10% 5% 10%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const Title = styled.h1`
  text-align: center;
  padding-top: 100px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;
export const TitleH2 = styled.h2`
  padding-bottom: 30px;
  text-align: center;
`;
export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;
export const Contactform = styled.form`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;
export const Line = styled.div`
  border: 1px solid black;
  height: 150px;
  border-radius: 10px;
  margin: 0 200px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 1200px) {
    margin: 0 100px;
  }
`;
export const Input = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 40px;
  padding: 10px;
`;
export const Textarea = styled.textarea`
  height: 200px;
  width: 300px;
  margin-bottom: 40px;
  max-width: 300px;
  min-width: 300px;
  min-height: 100px;
  padding: 10px;
`;
export const Button = styled.button`
  background-color: #562bf6;
  color: #fff;
  border-radius: 50px;
  border: none;
  height: 50px;
  width: 300px;
  cursor: pointer;
  :hover {
  }
`;
// export const Message = styled.span``;

export const Text = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;
export const SocialIconLink = styled(Link)`
  color: #000000;
  font-size: 2rem;
  transition: all ease 0.5s;
  &:hover {
    transform: scale(1.25);
  }
`;
