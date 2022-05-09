import styled from "styled-components";
// import { RScroll } from "react-scroll";
import { Link } from "react-router-dom";

//Used in front page learn more
export const LearnMoreButton = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? "#562BF6" : "#010606")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#010606" : "#562BF6")};

    /* color: ${({ primary }) => (primary ? "#010606" : "#562BF6")}; */

    color: ${({ primary }) => (primary ? "#fff" : "#562BF6")};
  }
`;

//Used in Hero section
export const ButtonTransparent = styled(Link)`
  background-color: rgba(255, 255, 255, 0);
  color: ${({ dark }) => (dark ? "#fff" : "#010606")};
  white-space: nowrap;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  font-weight: bold;
  border: 3px solid #fff;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  text-transform: uppercase;
  transition: background-color 0.5s ease-out;
  margin-top: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#fff" : "#562BF6")};

    color: ${({ primary }) => (primary ? "#010606" : "#562BF6")};
  }
`;

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
  /* transition: 1s;
  :hover {
    background: #562bf1;
    transition: 1s;
  } */
`;
