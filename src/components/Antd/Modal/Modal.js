import React from "react";
import { Modal as AntModal } from "antd";

function Modal({
  children,
  isModalVisible,
  title,
  handleCancel,
  handleOk,
  className = "",
  footer = null,
  ...rest
}) {
  return (
    <AntModal
      title={<h5>{title}</h5>}
      open={isModalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      className={className}
      footer={footer}
      {...rest}
      placeholder="Basic usage"
    >
      {children}
    </AntModal>
  );
}

export default Modal;
