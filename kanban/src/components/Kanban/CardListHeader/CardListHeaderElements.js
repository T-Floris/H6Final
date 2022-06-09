import styled from "styled-components";

export const CardListHeader = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bg3};
  padding: 9px 11px 1px 9px;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;
