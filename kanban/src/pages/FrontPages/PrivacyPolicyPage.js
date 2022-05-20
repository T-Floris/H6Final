import React from "react";
import styled from "styled-components";

import Footer from "../../components/FrontPage/Footer";
import ScrollToTop from "../../components/Utils/ScrollToTop";
import PrivacyPolicy from "../../components/FrontPage/PrivacyPolicy";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import NavbarLite from "../../components/Layout/NavbarLite";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div``;

const PrivacyPolicyPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.privacyPolicyPageTitle}
        description={MetaData.privacyPolicyPageDesc}
      />

      <ScrollToTop />
      <NavbarLite />
      <PrivacyPolicy />
      <Footer />
    </Container>
  );
};

export default PrivacyPolicyPage;
