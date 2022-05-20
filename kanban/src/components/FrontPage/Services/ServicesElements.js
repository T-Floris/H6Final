import styled from "styled-components";

export const Container = styled.div`
  /* height: 937px; */
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;

  @media screen and (max-width: 768px) {
    height: 1100px;
    padding: 100px 0;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const Wrapper = styled.div`
  max-width: 1100px; //Box width
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const Card = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  /* max-height: 340px; */
  height: 340px;
  padding: 30px;
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const Img = styled.img`
  height: 160px;
  width: 160px;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #010606;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const SubTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  font-size: 1rem;
  text-align: center;
`;
