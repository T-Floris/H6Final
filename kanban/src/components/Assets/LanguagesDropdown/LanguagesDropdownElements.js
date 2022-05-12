import styled from "styled-components";
import { AiOutlineGlobal } from "react-icons/ai";

export const Container = styled.div`
  user-select: none;
  position: relative;
`;
export const LanguagesButton = styled.div`
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const GlobalIcon = styled(AiOutlineGlobal)`
  font-size: 30px;
  color: #fff;
`;
export const Content = styled.div`
  position: absolute;
  /* top: 100%; */
  bottom: 100%;
  left: -10px;
  padding: 20px;
  background-color: #fff;
`;
export const ContainerItem = styled.ul`
  list-style-type: none;
  cursor: pointer;
`;
export const Item = styled.li`
  cursor: pointer;
  
`;
