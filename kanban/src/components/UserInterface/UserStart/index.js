import React from "react";
import { Container, Title, Text, Wrapper } from "./StartElements";
import { PageBar } from "../../Layout/CurrentPageBar/CurrentPageBarElements";

const Home = () => {
  return (
    <Container>
      <PageBar>
        <Title>Home Page</Title>
      </PageBar>
      <Wrapper>
        <Text>Something...</Text>
      </Wrapper>
    </Container>
  );
};

export default Home;
