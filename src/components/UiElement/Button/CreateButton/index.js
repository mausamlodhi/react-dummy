import React from "react";

export default function CreateButton({ onHandleShow, btnText, icon= true }) {
  return (
    <>
      <button
        className="btn btn-primary d-none d-md-inline-flex"
        data-toggle="modal"
        data-target="#addForm"
        onClick={onHandleShow}
      >
        {icon && <em className="icon ni ni-plus" />}
        <span>{btnText}</span>
      </button>
    </>
  );
}
