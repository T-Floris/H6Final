import React from "react";
import { Container, Title, Text, Wrapper } from "./MessageElementals";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";
const Message = () => {
  return (
    <Container>
      <PageBar>
        <Title>Message</Title>
      </PageBar>
      <Wrapper>
        <Text>Something...</Text>
      </Wrapper>
    </Container>
  );
};

export default Message;
