import React from "react";
import { Radio as AntRadio } from "antd";

function Radio({ children, ...rest }) {
  return (
    <AntRadio {...rest} placeholder="Basic usage">
      {children}
    </AntRadio>
  );
}

export default Radio;
