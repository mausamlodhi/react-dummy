import { notification } from "antd";
import React, { memo } from "react";

function OpenNotification({ title, type }) {
  return (
    <>
      {type === "error"
        ? notification.error({
            message: `${title}`,
          })
        : notification.success({
            message: `${title}`,
          })}
      ;
    </>
  );
}

export default memo(OpenNotification);
