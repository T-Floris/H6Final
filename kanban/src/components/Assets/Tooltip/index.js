import React, { useState } from "react";
import {
  TooltipBoxContainer,
  TooltipBox,
  TooltipButton,
  TooltipContainer,
} from "./TooltipElements";

const Tooltip = ({ position, text, children, background }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const showTooltip = true;
  const showTooltip = isHovered || isFocused;

  return (
    <TooltipContainer>
      <TooltipButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {children}
      </TooltipButton>
      {showTooltip && (
        <TooltipBoxContainer position={position}>
          <TooltipBox background={background} position={position}>
            {text}
          </TooltipBox>
        </TooltipBoxContainer>
      )}
    </TooltipContainer>
  );
};

export default Tooltip;
