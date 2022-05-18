import styled from "styled-components";
// import { RScroll } from "react-scroll";
import { Link } from "react-router-dom";

//Used in Frontpage Herosection
export const ButtonTransparent = styled(Link)`
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  border: 3px solid #fff;
  padding: 12px 30px;
  text-transform: uppercase;
  transition: background-color 0.5s ease-out;
  margin-top: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #fff;
    color: black;
    font-weight: bold;
  }
`;

//Used in FrontPage BurgerMenu
export const BurgerMenuButton = styled(Link)`
  border-radius: 50px;
  background: #562bf6;
  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 20px 0px;
  font-weight: bold;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

//Call to action Button
export const CTAButton = styled.button`
  background-color: #562bf6;
  margin: 10px;
  color: #fff;
  border-radius: 50px;
  border: none;
  height: 50px;
  width: 100px;
  cursor: pointer;
`;
