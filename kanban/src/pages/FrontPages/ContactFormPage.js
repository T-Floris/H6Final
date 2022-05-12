import React from "react";
import styled from "styled-components";
import ContactForm from "../../components/FrontPage/ContactForm";
import Footer from "../../components/FrontPage/Footer";

import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import ScrollToTop from "../../components/Utils/ScrollToTop";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div``;

const ContactFormPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.contactFormPageTitle}
        description={MetaData.contactFormPageDesc}
      />

      <ScrollToTop />
      <ContactForm />
      <Footer />
    </Container>
  );
};

export default ContactFormPage;
