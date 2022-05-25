import React, { useRef } from "react";

import {
  TabHeaderContainer,
  TabButton,
  Panel,
  TabsHolder,
  inactiveTab,
} from "./TabsElements";

export const Tab = ({ label, active, onClick }) => {
  return (
    <TabButton
      role="tabtab"
      active={active}
      onClick={onClick}
      inactiveStyle={inactiveTab}
    >
      {label}
    </TabButton>
  );
};

export const Tabs = ({ selectedTab, onChange, children }) => {
  const containerRef = useRef(null);

  const tabs = children.map((child) => {
    const handleClick = (e) => {
      onChange(e, child.props.value);
    };

    return React.cloneElement(child, {
      key: child.props.value,
      active: child.props.value === selectedTab,
      onClick: handleClick,
    });
  });

  return (
    <TabHeaderContainer ref={containerRef}>
      <TabsHolder>{tabs}</TabsHolder>
    </TabHeaderContainer>
  );
};

export const TabPanel = ({ children, value, selectedIndex }) => {
  const hidden = value !== selectedIndex;

  return (
    <Panel hidden={hidden} active={!hidden}>
      {children}
    </Panel>
  );
};
