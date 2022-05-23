import { css } from "styled-components";

export const v = {
  sidebarWidth: `300px`,
  smSpacing: `8px`,
  mdSpacing: `16px`,
  lgSpacing: `24px`,
  xlSpacing: `32px`,
  xxlSpacing: `48px`,
  borderRadius: `6px`,
};

export const btnReset = css`
  font-family: inherit;
  outline: none;
  border: none;
  background: none;
  letter-spacing: inherit;
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  padding: 0;
`;

export const backgroundTheme = css`
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.6px;
  transition: 0.3s;
`;
