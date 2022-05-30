import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
} from "./NavbarLiteElements";

const NavbarLite = ({ toggle }) => {
  //navbars background changes color when scrolled
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

  //scrolling to top
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
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavbarLite;
