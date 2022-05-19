import React from "react";
import { BurgerMenuButton } from "../../Assets/ButtonElements";
import {
  BurgerMenuContainer,
  Icon,
  CloseIcon,
  BurgerMenuWrapper,
  BurgerMenuMenu,
  BurgerMenuLink,
  BurgerMenuBtnWrap,
} from "./BurgerMenuElements";

const BurgerMenu = ({ isOpen, toggle }) => {
  return (
    <BurgerMenuContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <BurgerMenuWrapper>
        <BurgerMenuMenu>
          <BurgerMenuLink //smooth scroll below
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            to="home"
            onClick={toggle}
          >
            Home
          </BurgerMenuLink>

          {LinkArray.map(({ label, to }) => (
            <BurgerMenuLink //smooth scroll below
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              to={to}
              onClick={toggle}
              // unique key for array children
              key={label}
            >
              {label}
            </BurgerMenuLink>
          ))}
        </BurgerMenuMenu>
        <BurgerMenuBtnWrap>
          {secondaryLinksArray.map(({ label, to }) => (
            // unique key for array children
            <BurgerMenuButton key={label} to={to}>{label}</BurgerMenuButton>
          ))}
        </BurgerMenuBtnWrap>
      </BurgerMenuWrapper>
    </BurgerMenuContainer>
  );
};

const LinkArray = [
  {
    label: "Discover",
    to: "discover",
  },
  {
    label: "Services",
    to: "services",
  },
  {
    label: "Pricing",
    to: "pricing",
  },
];

const secondaryLinksArray = [
  {
    label: "Sign In",
    to: "signin",
  },
  {
    label: "Sign Up",
    to: "signup",
  },
];

export default BurgerMenu;
