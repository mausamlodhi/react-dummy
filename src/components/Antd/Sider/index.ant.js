import React from "react";
import { Layout } from "antd";

const { Sider } = Layout;

function AntSider({ children, ...rest }) {
  return <Sider {...rest}>{children}</Sider>;
}

export default AntSider;
