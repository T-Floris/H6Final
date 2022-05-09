import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 100vh;
`;
export const Title = styled.h1`
  text-align: center;
  padding-top: 100px;
  font-size: 4rem;

  @media only screen and (max-width: 1200px) {
    font-size: 3rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
export const Text = styled.p`
  text-align: center;
  font-size: 2rem;
  padding: 20px 0;
  font-weight: bold;
  
  @media only screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;
export const Magnifier = styled.img`
  width: 50%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  padding: 50px 0;
  @media only screen and (max-width: 480px) {
    width: 40%;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const HomeLink = styled(Link)``;
