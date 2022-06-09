import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCheck,
  faTrashAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 3px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top || "2px"};
  right: ${(props) => props.right || "3px"};
`;

const getIconForType = (type) => {
  switch (type) {
    case "edit":
      return faPen;
    case "confirm":
      return faCheck;
    case "delete":
      return faTrashAlt;
    case "copy":
      return faCopy;
    default:
      return null;
  }
};

const IconButton = (props) => {
  return (
    // spread operator
    <Button {...props}>
      {/* displays icons */}
      <FontAwesomeIcon icon={getIconForType(props.iconType)} />
    </Button>
  );
};
IconButton.propTypes = {
  iconType: PropTypes.oneOf(["edit", "confirm", "delete", "copy"]),
};
IconButton.ButtonContainer = ButtonContainer;

export default IconButton;
