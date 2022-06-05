import React from "react";
import styled from "styled-components";
import AdminDashboard from "../../components/Admin/Dashboard";
import { backgroundTheme } from "../../components/Assets/variables";
import { useTranslation } from "react-i18next";
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
import Sidebar from "../../components/Menus/Sidebar";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const AdminDashboardPage = () => {
  //i18next
  const { t } = useTranslation();
  const LinksArray = [
    {
      label: t("sidebar_admindashboard"),
      icon: <AiOutlineHome />,
      to: "/dashboard",
      notification: 0,
    },
    {
      label: t("sidebar_userlist"),
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
      <AdminDashboard />
    </Container>
  );
};

export default AdminDashboardPage;
