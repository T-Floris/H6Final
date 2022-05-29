import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";

import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {

  //i18next
  const { t } = useTranslation();

  const navbarMenuArray1 = t("menu_array1", { returnObjects: true })
  const navbarMenuArray2 = t("menu_array2", { returnObjects: true })

  //Navbar's background changes color when scrolled
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  //scrolling to top with help of "React-scroll npm package"
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          {/* scrolling to top when clicked */}
          <NavLogo to="/" onClick={toggleHome}>
            KanBan
          </NavLogo>{" "}
          {/* Hamburger menu */}
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {navbarMenuArray1.map(({ label, to }) => (
              // unique key for array children
              <NavItem key={label}>
                <NavLinks
                  to={to}
                  //smooth scroll below
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  {label}
                </NavLinks>
              </NavItem>
            ))}
          </NavMenu>
          <NavBtn>
            {navbarMenuArray2.map(({ label, to }) => (
              // unique key for array children
              <NavBtnLink key={label} to={to}>
                {label}
              </NavBtnLink>
            ))}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

// const LinkArray = [
//   {
//     label: "Discover",
//     to: "discover",
//   },
//   {
//     label: "Services",
//     to: "services",
//   },
//   {
//     label: "Pricing",
//     to: "pricing",
//   },
// ];
// const secondaryLinksArray = [
//   {
//     label: "Sign In",
//     to: "/signin",
//   },
//   {
//     label: "Sign Up",
//     to: "/signup",
//   },
//   {
//     label: "Board",
//     to: "/board",
//   },
//   {
//     label: "Dashboard",
//     to: "/userstart",
//   },
// ];

export default Navbar;
