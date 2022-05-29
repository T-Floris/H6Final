import React, { useState } from "react";
import { Tabs, Tab, TabPanel } from "../../Assets/Tabs";
import Security from "./UserProfileTabs/Security";
import {
  Container,
  Wrapper,
  TabsContainer,
  TabPanelContainer,
} from "./UserProfileElements";
import Email from "./UserProfileTabs/Email";
import Profile from "./UserProfileTabs/Profile";
import DeleteAccount from "./UserProfileTabs/DeleteAccount";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <Container>
      <TabsContainer>
        <Tabs selectedTab={activeTab} onChange={handleChange}>
          <Tab label="Profile" value={0}></Tab>
          <Tab label="E-mail" value={1}></Tab>
          <Tab label="Security" value={2}></Tab>
        </Tabs>
      </TabsContainer>

      <Wrapper>
        <TabPanelContainer>
          <TabPanel value={activeTab} selectedIndex={0}>
            <Profile />
            <DeleteAccount />
          </TabPanel>

          <TabPanel value={activeTab} selectedIndex={1}>
            <Email />
          </TabPanel>
          <TabPanel value={activeTab} selectedIndex={2}>
            <Security />
          </TabPanel>
        </TabPanelContainer>
      </Wrapper>
    </Container>
  );
};

export default UserProfile;
