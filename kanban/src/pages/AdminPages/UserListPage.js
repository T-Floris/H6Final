import React from "react";
import styled from "styled-components";
import UserList from "../../components/Admin/UserList";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Menus/Sidebar";
import { useTranslation } from "react-i18next";
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const AdminUserListPage = () => {
    //i18next
  const { t } = useTranslation();
  const LinksArray = [
    {
      label: t("sidebar_start"),
      icon: <AiOutlineHome />,
      to: "/dashboard",
      notification: 0,
    },
    {
      label: t("sidebar_workspace"),
      icon: <FaUsers />,
      to: "/userlist",
      notification: 0,
    }
  ];
  return (
    <Container>
      <MetaDecorator
        title={MetaData.admindashboardPageTitle}
        description={MetaData.admindashboardPageDesc}
      />
      <Sidebar links={LinksArray}/>
      <UserList />
    </Container>
  );
};

export default AdminUserListPage;
