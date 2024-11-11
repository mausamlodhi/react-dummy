import React from "react";
import { Link } from "react-router-dom";

function LinkComponent({ name, icon, onHandleClick, path = "#" }) {
  return (
    <>
      {onHandleClick ? (
        <Link
          className="dropdown-item"
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onHandleClick();
          }}
        >
          <span className={icon}>
            <span className="path1" />
            <span className="path2" />
          </span>
          {name}
        </Link>
      ) : (
        <Link className="dropdown-item" to={path}>
          <span className={icon}>
            <span className="path1" />
            <span className="path2" />
          </span>
          {name}
        </Link>
      )}
    </>
  );
}

export default LinkComponent;
