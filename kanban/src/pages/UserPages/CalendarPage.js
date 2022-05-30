import React from "react";
import styled from "styled-components";
import { backgroundTheme } from "../../components/Assets/variables";
import Sidebar from "../../components/Menus/Sidebar";
import Calendar from "../../components/UserInterface/Calendar"
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");

const Container = styled.div`
  ${backgroundTheme}
`;

const CalendarPage = () => {
  return (
    <Container>
      <MetaDecorator
        title={MetaData.calendarPageTitle}
        description={MetaData.calendarPageDesc}
      />
      <Sidebar />
      <Calendar />
    </Container>
  );
};

export default CalendarPage;
