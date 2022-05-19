import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

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
            {LinkArray.map(({ label, to }) => (
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
            {secondaryLinksArray.map(({ label, to }) => (
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

const LinkArray = [
  {
    label: "About",
    to: "about",
  },
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
    to: "/signin",
  },
  {
    label: "Sign Up",
    to: "/signup",
  },
  {
    label: "Board",
    to: "/board",
  },
  {
    label: "Dashboard",
    to: "/userstart",
  },
];

export default Navbar;
