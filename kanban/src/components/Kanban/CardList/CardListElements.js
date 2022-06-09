import styled from "styled-components";

export const CardListContainer = styled.div`
  background: ${(props) =>
    props.isDraggingOver ? props.theme.primary : props.theme.bg3};
  padding: 8px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  padding-bottom: 1px;
`;
export const CardListWrapper = styled.div`
  min-width: 170px;
  height: 88vh;
  overflow: auto;
`;
