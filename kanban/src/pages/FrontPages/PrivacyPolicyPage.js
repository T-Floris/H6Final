import React from "react";
import styled from "styled-components";
import Footer from "../../components/FrontPage/Footer";

import ScrollToTop from "../../components/Utils/ScrollToTop";
import PrivacyPolicy from "../../components/FrontPage/PrivacyPolicy";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
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

      <PrivacyPolicy />
      <Footer />
    </Container>
  );
};

export default PrivacyPolicyPage;
