import React from "react";
import styled from "styled-components";
import Start from "../../components/UserInterface/UserStart";
import Sidebar from "../../components/Layout/Sidebar";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import { backgroundTheme } from "../../components/Assets/variables";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const DashboardPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.dashboardPageTitle}
        description={MetaData.dashboardPageDesc}
      />
      <Sidebar />
      

      <Start />
    </Container>
  );
};

export default DashboardPage;
