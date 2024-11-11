import { MoreOutlined } from "@ant-design/icons";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function ActionDropdown({
  options,
  extraClassName,
  iconClass,
  toggleClass,
  menuClass,
  itemClass,
  span,
}) {
  function getButton(data) {
    let element;
    if (data.action === "redirect") {
      element = <Link to={data.path}>{data.name}</Link>;
    } else if (data.action === "modal") {
      element = (
        <a href={data.path} rel="noreferrer" download>
          {data.name}
        </a>
      );
    } else if (data.action === "confirm") {
      element = (
        <Link
          className={itemClass}
          to="#"
          onClick={(e) => {
            e.preventDefault();
            data.onClickHandle();
          }}
        >
          {span === true ? (
            <span className={data.icon}>
              <span className="path1" />
              <span className="path2" />
              {data.path3 === true && <span className="path3" />}
            </span>
          ) : (
            <span className={data.icon} />
          )}
          {data.name}
        </Link>
      );
    }

    return element;
  }
  return (
    <Dropdown className={extraClassName}>
      <Dropdown.Toggle as="a" className={toggleClass}>
        {iconClass ? <span className={iconClass} /> : <MoreOutlined />}
      </Dropdown.Toggle>
      <Dropdown.Menu drop="up" className={menuClass}>
        {options.map((item, key) => {
          return (
            <>
              <Dropdown.Item as="div" key={key} className={item?.itemClassName}>
                {getButton(item)}
              </Dropdown.Item>
            </>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ActionDropdown;
