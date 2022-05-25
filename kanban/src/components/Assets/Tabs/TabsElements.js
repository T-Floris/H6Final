import styled, { css } from "styled-components";

export const TabHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
`;

export const TabButton = styled.button`
  color: ${({ theme }) => theme.text};
  width: 100%;
  padding: 20px 0px;
  font-size: 1.25rem;
  background-color: transparent;
  border: none;
  border-bottom-color: #393e46;

  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  ${(p) =>
    p.active &&
    css`
      /* color: #562bf6; */
      font-weight: bold;
    `}
  ${(p) => !p.active && p.inactiveStyle}
`;

export const Panel = styled.div`
  display: ${(p) => (p.active ? "flex" : "none")};
  font-size: 1rem;
  /* background: #ff9f43; */
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const TabsHolder = styled.div`
  display: flex;
  /* can be used to stack them vertically by using column*/
  flex-direction: row;
`;

export const inactiveTab = {
  opacity: 0.65,
};
