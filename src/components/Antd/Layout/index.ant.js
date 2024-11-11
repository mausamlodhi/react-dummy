import React from "react";
import { Layout } from "antd";

function AntLayout({ children, ...rest }) {
  return <Layout {...rest}>{children}</Layout>;
}

export default AntLayout;
