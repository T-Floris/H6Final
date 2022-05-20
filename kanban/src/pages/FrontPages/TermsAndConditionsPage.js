import React from "react";
import styled from "styled-components";
import Footer from "../../components/FrontPage/Footer";

import ScrollToTop from "../../components/Utils/ScrollToTop";
import TermsAndConditions from "../../components/FrontPage/TermsAndConditions";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import NavbarLite from "../../components/Layout/NavbarLite";
const MetaData = require("../../components/Utils/Meta/MetaData.json");


const Container = styled.div``;

const TermsAndConditionsPage = () => {
  return (
    <Container>
    <MetaDecorator
        title={MetaData.TermsAndConditionsPageTitle}
        description={MetaData.TermsAndConditionsPageDesc}
      />
      <ScrollToTop />
      <NavbarLite />
      <TermsAndConditions />
      <Footer />
    </Container>
  );
};

export default TermsAndConditionsPage;
