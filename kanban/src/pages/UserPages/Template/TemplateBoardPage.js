import React from "react";
import Board from "../../../containers/Board";
import { Provider } from "react-redux";
import store from "../../../store";
import styled from "styled-components";
import MetaDecorator from "../../../components/Utils/Meta/MetaDecorator";
import Sidebar from "../../../components/Menus/Sidebar";
import { useTranslation } from "react-i18next";

import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineDashboard,
  MdOutlineCalendarToday,
  MdOutlineMessage,
  MdOutlineGroup,
  MdWorkspacesOutline,
} from "react-icons/md";
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
  //i18next
  const { t } = useTranslation();
  const LinksArray = [
    {
      label: t("sidebar_start"),
      icon: <AiOutlineHome />,
      to: "/userstart",
      notification: 0,
    },
    {
      label: t("sidebar_workspace"),
      icon: <MdWorkspacesOutline />,
      to: "/workspace",
      notification: 0,
    },
    {
      label: t("sidebar_board"),
      icon: <MdOutlineDashboard />,
      to: "/boards",
      notification: 0,
    },
    {
      label: t("sidebar_group"),
      icon: <MdOutlineGroup />,
      to: "/group",
      notification: 0,
    },
    {
      label: t("sidebar_calendar"),
      icon: <MdOutlineCalendarToday />,
      to: "/calendar",
      notification: 0,
    },
    {
      label: t("sidebar_message"),
      icon: <MdOutlineMessage />,
      to: "/message",
      notification: 5,
    },
  ];
  return (
    <TemplateBoardContainer>
      <MetaDecorator
        title={MetaData.templateboardPageTitle}
        description={MetaData.templateboardPageDesc}
      />

      <Sidebar links={LinksArray}/>
      <Provider store={store}>
        {" "}
        {/*store is required by redux*/}
        <Board />
      </Provider>
    </TemplateBoardContainer>
  );
};

export default TemplateBoardPage;
