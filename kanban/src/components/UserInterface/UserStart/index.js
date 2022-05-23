import React from "react";
import { Container, Title, Text, Wrapper } from "./StartElements";
import { PageBar } from "../../Layout/CurrentPageBar/CurrentPageBarElements";

const Home = () => {

  //Welcome message for user
  const date = new Date();
  const hours = date.getHours();
  let message;

  if (hours < 12) {
    message = "Good Morning";
  } else if (hours < 18) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }
  
  return (
    <Container>
      <PageBar>
        <Title>Home Page</Title>
      </PageBar>
      <Wrapper>
        <Text>{message} User</Text>
      </Wrapper>
    </Container>
  );
};

export default Home;
