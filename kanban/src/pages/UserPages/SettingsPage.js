import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Menus/Sidebar";
import Settings from "../../components/UserInterface/Settings";
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
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const SettingPage = () => {
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
    <Container>
      <MetaDecorator
        title={MetaData.settingsPageTitle}
        description={MetaData.settingsPageDesc}
      />
      <Sidebar links={LinksArray}/>
      <Settings />
    </Container>
  );
};

export default SettingPage;
