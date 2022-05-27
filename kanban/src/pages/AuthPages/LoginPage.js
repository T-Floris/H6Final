import React from "react";
import styled from "styled-components";

import Login from "../../components/Auth/Login";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div``;

const LoginPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.admindashboardPageTitle}
        description={MetaData.admindashboardPageDesc}
      />

      <Login />
    </Container>
  );
};

export default LoginPage;
