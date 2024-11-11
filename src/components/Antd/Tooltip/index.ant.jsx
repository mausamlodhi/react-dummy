import React from "react";
import { Tooltip } from "antd";

function AntTooltip({ children, promptText, ...rest }) {
  return (
    <Tooltip title={promptText} {...rest}>
      {children}
    </Tooltip>
  );
}

export default AntTooltip;
