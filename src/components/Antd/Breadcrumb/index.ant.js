import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function AntBreadcrumb({ breadcrmb }) {
  return (
    <Breadcrumb>
      {breadcrmb.map((item, key) => {
        return (
          <Breadcrumb.Item key={key}>
            <Link to={item.path}>{item.name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default AntBreadcrumb;
