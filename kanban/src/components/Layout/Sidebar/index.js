import React, { useRef, useState } from "react";
import {
  Container,
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSearch,
  SSearchIcon,
  SSidebar,
  SSidebarToggleButton,
  STheme,
  SThemeLabel,
  ProfileContainer,
  Profile,
  ProfileName,
  BurgerMenuContainer,
  BurgerMenuIcon,
  CloseIcon,
} from "./SidebarElements";

import {
  AiOutlineLeft,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";

import { MdLogout } from "react-icons/md";

import { LinksArray } from "./Data";
import profile from "../../../images/catForTesting.jpg";
import Darkmode from "../../Assets/Darkmode";

const Sidebar = () => {
  const searchRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); //false: sidebar is closed

  //Search bar
  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      searchRef.current.focus();
    } else {
      // search functionality
    }
  };

  return (
    <>
      <Container>
        <BurgerMenuContainer>
          <BurgerMenuIcon
            isopen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          />
        </BurgerMenuContainer>
        <SSidebar isopen={sidebarOpen}>
          <SSidebarToggleButton
            isopen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <AiOutlineLeft />
          </SSidebarToggleButton>

          {/* Close button for burgermenu */}
          <CloseIcon
            isopen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          />
          {/* short circuit: sidebaropen is closed display KB, otherwise display KanBan */}
          {(!sidebarOpen && <SLogo to="/userstart">KB</SLogo>) || (
            <SLogo to="/userstart">KanBan</SLogo>
          )}

          <SSearch
            onClick={searchClickHandler}
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            {sidebarOpen || (
              <SSearchIcon>
                <AiOutlineSearch />
              </SSearchIcon>
            )}

            {sidebarOpen && (
              <SSearchIcon>
                <AiOutlineSearch />
              </SSearchIcon>
            )}

            <input
              ref={searchRef}
              placeholder="Search"
              style={!sidebarOpen ? { width: 0, padding: 0 } : {}} //searchbar overflows if width&padding is not 0
            />
          </SSearch>
          <SDivider />
          {LinksArray.map(({ icon, label, notification, to }) => (
            // unique key for array children
            <SLinkContainer key={label}>
              <SLink
                to={to}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
              >
                {sidebarOpen || <SLinkIcon>{icon}</SLinkIcon>}

                {sidebarOpen && (
                  <>
                    <SLinkIcon>{icon}</SLinkIcon>
                    <SLinkLabel>{label}</SLinkLabel>
                    {/* if notifications are at 0 or null, do not display */}
                    {!!notification && (
                      <SLinkNotification>{notification}</SLinkNotification>
                    )}
                  </>
                )}
              </SLink>
            </SLinkContainer>
          ))}
          <SDivider />

          <SLinkContainer>
            <SLink
              to="/settings"
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              {/* short-circuit evaluation */}
              {sidebarOpen || (
                <SLinkIcon>
                  <AiOutlineSetting />
                </SLinkIcon>
              )}

              {sidebarOpen && (
                <>
                  <SLinkIcon>
                    <AiOutlineSetting />
                  </SLinkIcon>
                  <SLinkLabel>Settings</SLinkLabel>
                </>
              )}
            </SLink>
          </SLinkContainer>

          <SLinkContainer>
            <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
              {/* short-circuit evaluation */}
              {sidebarOpen || (
                <SLinkIcon>
                  <MdLogout />
                </SLinkIcon>
              )}

              {sidebarOpen && (
                <>
                  <SLinkIcon>
                    <MdLogout />
                  </SLinkIcon>
                  <SLinkLabel>Logout</SLinkLabel>
                </>
              )}
            </SLink>
          </SLinkContainer>

          <SDivider />
          <STheme>
            {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
            <Darkmode />
          </STheme>

          <SDivider />

          <ProfileContainer>
            <SLink
              to="/userprofile"
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              <Profile src={profile} />
              {sidebarOpen && <ProfileName>Username</ProfileName>}
            </SLink>
          </ProfileContainer>
        </SSidebar>
      </Container>
    </>
  );
};
export default Sidebar;
