import React from "react";
import { Container, Title, Text, Wrapper } from "./SettingsElements";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";

const Settings = () => {
  return (
    <Container>
      <PageBar>
        <Title>Settings</Title>
      </PageBar>
      <Wrapper>
        <Text>Language</Text>

        <Text>Time zone</Text>
      </Wrapper>
    </Container>
  );
};

export default Settings;
