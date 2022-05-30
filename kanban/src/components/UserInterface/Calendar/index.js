import React from "react";
import { Container, Title, Text, Wrapper } from "./CalendarElements";
import { PageBar } from "../../Menus/CurrentPageBar/CurrentPageBarElements";

const Calendar = () => {
  return (
    <Container>
      <PageBar>
        <Title>Calendar</Title>
      </PageBar>
      <Wrapper>
        <Text>Something...</Text>
      </Wrapper>
    </Container>
  );
};

export default Calendar;
