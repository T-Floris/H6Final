import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const Title = styled.h1`
  margin-top: 50px;
  font-size: 2.5rem;
  text-align: center;
  color: #010606;
  margin-bottom: 64px;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const Wrapper = styled.div``;
export const PlanTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 25px;
`;
export const ToggleSwitch = styled.div`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
export const Toggler = styled.input`
  appearance: none;
  width: 50px;
  height: 25px;
  background-color: #562bf6;
  border-radius: 25px;
  margin: 0 15px;
  position: relative;
  ::before {
    content: "";
    width: 16px;
    height: 16px;
    background-color: white;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    right: 4px;
  }
  :checked::before {
    right: 55%;
  }
`;
export const Cards = styled.div`
  /* display: flex;
  gap: 20px; */
  /* @media only screen and (max-width: 1200px) {
    flex-direction: column;
  } */
  /* max-width: 1100px; //Box width */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;
  @media screen and (max-width: 1250px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
export const Card = styled.div`
  height: 500px;
  width: 280px;
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
`;
export const CardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: lighter;
  margin-bottom: 20px;
`;
export const CardPrice = styled.h3`
  font-size: 1.5rem;
  text-align: center;
`;
export const CardDesc = styled.p`
  margin: 5px;
`;
export const CardPlan = styled.ul`
  list-style-type: none;
  text-align: left;
  font-size: 1rem;
  font-weight: lighter;

  li::before {
    content: "✔";
    margin-right: 5px;
    color: #562bf6;
    font-size: 1.5rem;
  }
  li {
    margin-bottom: 5px;
  }
`;
export const CardButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  background-color: #562bf6;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;
