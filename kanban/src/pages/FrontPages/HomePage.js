import React from "react";
import styled from "styled-components";
import Announcement from "../../components/FrontPage/Announcement";
import HeroSection from "../../components/FrontPage/HeroSection";
import InfoSection from "../../components/FrontPage/InfoSection";


const Container = styled.div``;

const HomePage = () => {
  return (
    <Container>
      <Announcement />
      <HeroSection />
      <InfoSection />

    </Container>
  );
};

export default HomePage;
