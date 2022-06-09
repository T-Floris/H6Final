import styled from "styled-components";

export const CardContainer = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  position: relative;
  &:hover {
    cursor: drag;
  }
`;
