import styled from "styled-components";

//Pagebar displays the current page title like: Settings on top of page
export const PageBar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.bg};
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  @media screen and (max-width: 768px) {
    margin-top: 55px;
  }
`;
