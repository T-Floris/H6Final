import React from "react";
//import Board from "../../../components/Kanban/board";
import { Provider } from "react-redux";
//import store from "../../../redux/store";
import styled from "styled-components";
import MetaDecorator from "../../../components/Utils/Meta/MetaDecorator";
import Sidebar from "../../../components/Menus/Sidebar";
import { backgroundTheme } from "../../../components/Assets/variables";
const MetaData = require("../../../components/Utils/Meta/MetaData.json");

const TemplateBoardContainer = styled.div`
  ${backgroundTheme}
  //this below make the page fixed so you cant scroll vertical
  bottom: 0;
  left: 0;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  height: 100vh;
`;

const TemplateBoardPage = () => {
  return (
    <TemplateBoardContainer>
      <MetaDecorator
        title={MetaData.templateboardPageTitle}
        description={MetaData.templateboardPageDesc}
      />

      <Sidebar />
      {/* <Provider store={store}> */}
        {" "}
        {/*store is required by redux*/}
        {/* <Board /> */}
      {/* </Provider> */}
    </TemplateBoardContainer>
  );
};

export default TemplateBoardPage;
