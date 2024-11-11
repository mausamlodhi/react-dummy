import React from "react";
import { Popconfirm } from "antd";

function Confirm({ children, onConfirm, ...rest }) {
  const confirm = () => {
    onConfirm();
  };

  const cancel = () => {};
  return (
    <Popconfirm
      title="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
      {...rest}
    >
      {children}
    </Popconfirm>
  );
}

export default Confirm;
