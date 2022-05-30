import React from "react";

import UserBoard from "../../components/UserInterface/UserBoard"
import styled from "styled-components";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import Sidebar from "../../components/Menus/Sidebar";
import { backgroundTheme } from "../../components/Assets/variables";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const BoardContainer = styled.div`
  ${backgroundTheme}
`;

const BoardPage = () => {
  return (
    <BoardContainer>
      <MetaDecorator
        title={MetaData.boardPageTitle}
        description={MetaData.boardPageDesc}
      />

      <Sidebar />
      <UserBoard />
    </BoardContainer>
  );
};

export default BoardPage;
