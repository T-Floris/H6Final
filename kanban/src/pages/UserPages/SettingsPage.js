import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Layout/Sidebar";
import Settings from "../../components/UserInterface/Settings";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const SettingPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.settingsPageTitle}
        description={MetaData.settingsPageDesc}
      />
      <Sidebar />
      <Settings />
    </Container>
  );
};

export default SettingPage;
