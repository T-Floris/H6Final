import styled from "styled-components";
import { btnReset, v } from "../variables";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
  position: relative;
  ${btnReset};
`;
