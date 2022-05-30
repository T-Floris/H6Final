import React, { useState } from "react";
import styled from "styled-components";

import Navbar from "../../components/Menus/Navbar";
import BurgerMenu from "../../components/Menus/BurgerMenu";
import Announcement from "../../components/FrontPage/Announcement";
import HeroSection from "../../components/FrontPage/HeroSection";
import InfoSection from "../../components/FrontPage/InfoSection";
import Services from "../../components/FrontPage/Services";
import Newsletter from "../../components/FrontPage/Newsletter";
import Footer from "../../components/FrontPage/Footer";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import PricingTable from "../../components/FrontPage/PricingTable";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div``;

const HomePage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Container>
      <MetaDecorator
        title={MetaData.homePageTitle}
        description={MetaData.homePageDesc}
      />
      <Announcement />
      <BurgerMenu isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle}/> {/* toggle is for burgermenu icon */}
      <HeroSection />
      <InfoSection />
      <Services />
      <PricingTable />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default HomePage;
