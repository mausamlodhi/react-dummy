import React, { useMemo } from "react";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { CommonButton } from "../../UiElement";

function AntDropdown({
  sideBarData,
  userName,
  icon,
  icon2,
  extraClass = "",
  type = "",
  button = false,
  placement = "",
}) {
  const items = useMemo(() => {
    let arr = [];
    sideBarData.map((item) => {
      let obj = {};
      obj.label = (
        <Link to={item?.path} onClick={item.onClick}>
          {item.label}
        </Link>
      );
      obj.key = item.path;
      obj.icon = item.icon;
      obj.type = item.type;
      arr.push(obj);
    });
    return arr;
  }, [sideBarData]);

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      placement={placement}
    >
      {button ? (
        <CommonButton
          className={extraClass}
          type={type}
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            {icon}
            {userName}
            {icon2}
          </Space>
        </CommonButton>
      ) : (
        <Space onClick={(e) => e.preventDefault()}>
          {icon}
          {userName}
          {icon2}
        </Space>
      )}
    </Dropdown>
  );
}

export default AntDropdown;
