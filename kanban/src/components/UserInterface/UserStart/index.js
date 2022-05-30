import React from "react";
import { Container, Title, Text, Wrapper } from "./StartElements";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";
import { useTranslation } from "react-i18next";

const Home = () => {

//i18next
const { t } = useTranslation();

  //Welcome message for user
  const date = new Date();
  const hours = date.getHours();
  let message;

  if (hours < 12) {
    message = t("userstart_morning");
  } else if (hours < 18) {
    message = t("userstart_afternoon");
  } else {
    message = t("userstart_evening");
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
