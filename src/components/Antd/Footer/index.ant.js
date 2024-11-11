import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

function AntFooter({ children, ...rest }) {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
      {...rest}
    >
      {children}
    </Footer>
  );
}

export default AntFooter;
