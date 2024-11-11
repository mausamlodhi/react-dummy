import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export default function FilterButton({ popover, setVisible, visible }) {
  const cancelButton = () => {
    setVisible(false);
  };
  return (
    <>
      <Dropdown show={visible} className="fiterDropdown">
        <Dropdown.Toggle
          variant="transparent"
          id="dropdown-basic"
          className="btn btn-trigger btn-icon"
          onClick={() => setVisible(!visible)}
        >
          <em className="icon ni ni-filter-alt" />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" className="filter-wg dropdown-menu-xl">
          <div className="dropdown-head">
            <span className="sub-title dropdown-title">Filter</span>
            <div className="dropdown">
              <Link
                to="/"
                className="link link-dark"
                onClick={(e) => {
                  e.preventDefault();
                  cancelButton();
                }}
              >
                <em className="icon ni ni-cross" />
              </Link>
            </div>
          </div>
          {popover}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
