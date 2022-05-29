import React from "react";
import { Container, Title, Text, Wrapper } from "./GroupElements";
import { PageBar } from "../../Layout/CurrentPageBar/CurrentPageBarElements";
const Group = () => {
  return (
    <Container>
      <PageBar>
        <Title>Group</Title>
      </PageBar>
      <Wrapper>
        <Text>Something...</Text>
      </Wrapper>
    </Container>
  );
};

export default Group;
