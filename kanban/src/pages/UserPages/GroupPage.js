import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Layout/Sidebar";
import Group from "../../components/UserInterface/Group"
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const GroupPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.groupPageTitle}
        description={MetaData.groupPageDesc}
      />
      <Sidebar />
      <Group />
    </Container>
  );
};

export default GroupPage;
