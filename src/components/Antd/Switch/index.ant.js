import React from "react";
import { Switch as AntSwitch } from "antd";

export default function Switch({ onChange, disabled, checked}) {
  return (
    <AntSwitch
      // eslint-disable-next-line no-unneeded-ternary
      defaultChecked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
