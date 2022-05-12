import React from 'react';
import styled from 'styled-components';
import LearnMore from '../../components/FrontPage/LearnMore';
import MetaDecorator from "../../components/Utils/Meta/MetaDecorator";
const MetaData = require("../../components/Utils/Meta/MetaData.json");


const Container = styled.div``;

const LearnMorePage = () => {
  return (
      <Container>
        <MetaDecorator
        title={MetaData.learnMorePageTitle}
        description={MetaData.learnMorePageDesc}
      />
          <LearnMore />
      </Container>
  )
};

export default LearnMorePage;
