import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Menus/Sidebar";
import Message from "../../components/UserInterface/Message"
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const MessagePage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.messagePageTitle}
        description={MetaData.messagePageDesc}
      />
      <Sidebar />
      <Message />
    </Container>
  );
};

export default MessagePage;
