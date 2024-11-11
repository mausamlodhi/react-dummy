import React from "react";

function CancelButton({ btnText, ...rest }) {
  return (
    <>
      <button
        className="btn btn-lg btn-outline-primary cancelButton mr-2 ml-2 my-3"
        {...rest}
      >
        <span>{btnText}</span>
      </button>
    </>
  );
}

export default CancelButton;
