import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Menus/Sidebar";
import UserProfile from "../../components/UserInterface/UserProfile";
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const ProfilePage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.profilePageTitle}
        description={MetaData.profilePageDesc}
      />
      <Sidebar />
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;
