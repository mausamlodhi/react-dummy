import React from "react";
import { Menu } from "antd";

function AntMenu({ children, ...rest }) {
  return <Menu {...rest}>{children}</Menu>;
}

export default AntMenu;
