import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

function AntHeader({ children, ...rest }) {
  return <Header {...rest}>{children}</Header>;
}

export default AntHeader;
