import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
`;
export const TooltipButton = styled.button`
  border: none;
  /* for testing */
  /* background: red; */
  background: none;
  color: inherit;
  cursor: pointer;
  display: flex;
`;
export const TooltipBoxContainer = styled.div`
  position: absolute;
  width: 200px;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100%+5px);
  /* displaying on the right side */
  margin-left: 20px;
  width: 100%;
  top: -5%;
  left: calc(110% + 5px);
  width: max-content;
`;
export const TooltipBox = styled.span`
  position: fixed;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  text-align: center;
  border-radius: 5px;
  padding: 10px 10px;
  font-size: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);
`;
