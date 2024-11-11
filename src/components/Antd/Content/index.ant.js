import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

function AntContent({ children, ...rest }) {
  return <Content {...rest}>{children}</Content>;
}

export default AntContent;
