import React from "react";
import { useTranslation } from "react-i18next";

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

  //i18next
  const { t } = useTranslation();

  const burgerMenuArray1 = t("menu_array1", { returnObjects: true })
  const burgerMenuArray2 = t("menu_array2", { returnObjects: true })

  return (
    <BurgerMenuContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <BurgerMenuWrapper>
        <BurgerMenuMenu>
          {/* <BurgerMenuLink //smooth scroll below
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            to="home"
            onClick={toggle}
          >
            Home
          </BurgerMenuLink> */}

          {burgerMenuArray1.map(({ label, to }) => (
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
          {burgerMenuArray2.map(({ label, to }) => (
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
