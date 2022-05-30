import { Link } from "react-router-dom";
import styled from "styled-components";
import { btnReset, v } from "../../Assets/variables";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export const Container = styled.div`
  position: relative;
`;

export const BurgerMenuContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  position: fixed;
  z-index: 88;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export const BurgerMenuIcon = styled(GiHamburgerMenu)`
  font-size: 35px;
  color: ${({ theme }) => theme.text};
  margin: 10px 10px 5px 30px;
  cursor: pointer;
`;
export const CloseIcon = styled(FaTimes)`
  display: none;
  @media screen and (max-width: 768px) {
    display: initial;
    position: absolute;
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
    right: 0;
    margin: 5px 10px 0px 0px;
    cursor: pointer;
  }
`;

export const SSidebar = styled.div`
  width: ${({ isopen }) => (!isopen ? `100px` : v.sidebarWidth)};
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  padding: ${v.lgSpacing};
  z-index: 99;
  position: fixed;
  border-right: 1px solid ${({ theme }) => theme.bg3};
  transition: 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  


  @media screen and (max-width: 768px) {
    position: fixed;
    //hidding sidebar to the left
    left: ${({ isopen }) => (!isopen ? `-768px` : "0px")};
    padding: ${v.smSpacing};
    transition: 0.3s;
    width: 100%;
    /* overflow: hidden; */
    overflow-y: auto;
    /* Optional but highly reccomended: enables momentum scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    
  }

`;

export const SSidebarToggleButton = styled.button`
  ${btnReset};
  position: absolute;
  top: 146px;
  right: ${({ isopen }) => (isopen ? `20px` : `34px`)};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.bg3};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isopen }) => (!isopen ? `rotate(180deg)` : `initial`)};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SLogo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  display: block;
  cursor: pointer;
  margin-bottom: ${v.lgSpacing};
  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }
  /* @media screen and (max-height: 900px) {
    display: none;
  } */
`;

export const SSearch = styled.div`
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: ${v.borderRadius};
  input {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    color: inherit;
    background: transparent;
  }
  display: flex;
`;

export const SSearchIcon = styled.button`
  ${btnReset};
  padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
  display: flex;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

export const SDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
  background: ${({ theme, isActive }) =>
    !isActive ? `transparent` : theme.bg3};
  border-radius: ${v.borderRadius};
  margin: 8px 0;

  :hover {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;

  svg {
    font-size: 20px;
  }
`;

export const SLinkLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.smSpacing};
`;

export const SLinkNotification = styled.div`
  font-size: 14px;
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({ theme }) => theme.primary};
  color: white;

  margin-right: ${v.mdSpacing};
`;

export const STheme = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
export const SThemeLabel = styled.span`
  display: block;
  flex: 1;
`;
export const DarkmodeContainer = styled.div`
  border: none;
  background-color: ${({ theme }) => theme.bg};
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const DarkBtn = styled(MdOutlineDarkMode)`
  font-size: 33px;
`;
export const LightBtn = styled(MdOutlineLightMode)`
  font-size: 33px;
`;

export const SThemeToggler = styled.button`
  ${btnReset};
  position: relative;
`;

export const SToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  transition: 0.2s ease right;
  right: calc(100% - 18px - 1px);
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
`;

export const ProfileContainer = styled.div``;
export const Profile = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
`;
export const ProfileName = styled.p``;
