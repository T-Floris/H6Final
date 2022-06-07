import React from "react";
import UserBoard from "../../components/UserInterface/UserBoards"
import styled from "styled-components";
import Sidebar from "../../components/Menus/Sidebar";
import { backgroundTheme } from "../../components/Assets/variables";
import { useTranslation } from "react-i18next";

import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineDashboard,
  MdOutlineCalendarToday,
  MdOutlineMessage,
  MdOutlineGroup,
  MdWorkspacesOutline,
} from "react-icons/md";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import { Outlet } from "react-router-dom";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const BoardContainer = styled.div`
  ${backgroundTheme}
`;

const BoardsPage = () => {
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
    <BoardContainer>
      <MetaDecorator
        title={MetaData.boardPageTitle}
        description={MetaData.boardPageDesc}
      />

      <Sidebar links={LinksArray}/>
      <UserBoard />
      <Outlet />
    </BoardContainer>
  );
};

export default BoardsPage;
