import React from "react";
import styled from "styled-components";

import Register from "../../components/Auth/Register";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div``;

const RegisterPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.admindashboardPageTitle}
        description={MetaData.admindashboardPageDesc}
      />

      <Register />
    </Container>
  );
};

export default RegisterPage;
