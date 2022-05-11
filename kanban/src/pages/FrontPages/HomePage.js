import React from "react";
import styled from "styled-components";
import Announcement from "../../components/FrontPage/Announcement";
import HeroSection from "../../components/FrontPage/HeroSection";
import InfoSection from "../../components/FrontPage/InfoSection";
import Services from "../../components/FrontPage/Services";
import Newsletter from "../../components/FrontPage/Newsletter";
import Footer from "../../components/FrontPage/Footer";

const Container = styled.div``;

const HomePage = () => {
  return (
    <Container>
      <Announcement />
      <HeroSection />
      <InfoSection />
      <Services />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default HomePage;
