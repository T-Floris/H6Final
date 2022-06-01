import React from "react";
import styled from "styled-components";
import AdminDashboard from "../../components/Admin/Dashboard";
import { backgroundTheme } from "../../components/Assets/variables";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const AdminDashboardPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.admindashboardPageTitle}
        description={MetaData.admindashboardPageDesc}
      />
      
      <AdminDashboard />
    </Container>
  );
};

export default AdminDashboardPage;
