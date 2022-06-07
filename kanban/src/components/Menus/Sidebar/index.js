import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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
// import { LinksArray } from "./Data";
// import profile from "../../../images/catForTesting.jpg";
import Darkmode from "../../Assets/Darkmode";
import Modal from "../../Assets/Modals/LogoutModal";
import Tooltip from "../../Assets/Tooltip";


const Sidebar = ({ links }) => {
  
  //i18next
  const { t } = useTranslation();

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

  //Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  //axios private hook
  const axiosPrivate = useAxiosPrivate();

  const [userName, setUserName] = useState({
    userName: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    id: "",
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUserName = async () => {
      try {
        const response = await axiosPrivate.get("user", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUserName(response.data);
      } catch (err) {
        // console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUserName();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Modal showModal={showModal} setShowModal={openModal} />
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
            type="button"
          >
            <AiOutlineLeft />
          </SSidebarToggleButton>

          {/* Close button for burgermenu */}
          <CloseIcon
            isopen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          />
          {/* short circuit: sidebaropen is closed display KB, otherwise display KanBan */}
          {(!sidebarOpen && <SLogo to="/">KB</SLogo>) || (
            <SLogo to="/">KanBan</SLogo>
          )}

          <SSearch
            onClick={searchClickHandler}
            style={!sidebarOpen ? { width: `fit-content` } : {}}
          >
            {sidebarOpen || (
              <Tooltip
                text="Click to search"
                position="right"
                background="222831"
              >
                <SSearchIcon>
                  <AiOutlineSearch />
                </SSearchIcon>
              </Tooltip>
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
          {/* ? asking if the array existed */}
          {links?.map(({ icon, label, notification, to }) => (
            // unique key for array children
            <SLinkContainer key={label}>
              <SLink
                to={to}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
              >
                <Tooltip text={label} position="right" background="222831">
                  {sidebarOpen || <SLinkIcon>{icon}</SLinkIcon>}
                </Tooltip>
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
          {/* {LinksArray.map(({ icon, label, notification, to }) => (
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
          {/* {!!notification && (
                      <SLinkNotification>{notification}</SLinkNotification>
                    )}
                  </>
                )}
              </SLink>
            </SLinkContainer>
          ))} */}
          <SDivider />

          <SLinkContainer>
            <SLink
              to="/settings"
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              {/* short-circuit evaluation */}
              {sidebarOpen || (
                <Tooltip text="Settings" position="right" background="222831">
                  <SLinkIcon>
                    <AiOutlineSetting />
                  </SLinkIcon>
                </Tooltip>
              )}

              {sidebarOpen && (
                <>
                  <SLinkIcon>
                    <AiOutlineSetting />
                  </SLinkIcon>
                  <SLinkLabel>{t("sidebar_setting")}</SLinkLabel>
                </>
              )}
            </SLink>
          </SLinkContainer>

          <SLinkContainer>
            <SLink
              to="/"
              onClick={(event) => {
                event.preventDefault();
                setShowModal(true);
              }}
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              {/* short-circuit evaluation */}
              {sidebarOpen || (
                <Tooltip text="Logout" position="right" background="222831">
                  <SLinkIcon>
                    <MdLogout />
                  </SLinkIcon>
                </Tooltip>
              )}

              {sidebarOpen && (
                <>
                  <SLinkIcon>
                    <MdLogout />
                  </SLinkIcon>
                  <SLinkLabel>{t("sidebar_logout")}</SLinkLabel>
                </>
              )}
            </SLink>
          </SLinkContainer>

          <SDivider />
          <STheme>
            {sidebarOpen && <SThemeLabel>{t("sidebar_darkmode")}</SThemeLabel>}
            <Darkmode />
          </STheme>

          <SDivider />

          <ProfileContainer>
            <SLink
              to="/userprofile"
              style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
              <Profile size="50" name={userName.userName } />
              {sidebarOpen && <ProfileName>{userName.userName}</ProfileName>}
            </SLink>
          </ProfileContainer>
        </SSidebar>
      </Container>
    </>
  );
};
export default Sidebar;
