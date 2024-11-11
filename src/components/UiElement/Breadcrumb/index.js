import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ breadcrumb }) {
  return (
    <>
      {breadcrumb && (
        <nav>
          <ul className="breadcrumb breadcrumb-arrow">
            {breadcrumb.map((item, key) => {
              return item.path !== "#" ? (
                <li className="breadcrumb-item" key={key}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ) : (
                <li className="breadcrumb-item active" key={key}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
