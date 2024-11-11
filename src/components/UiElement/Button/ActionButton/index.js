import React from "react";

function ActionButton({ onHandleAction, btnText, extraBtnClass, icon = "" }) {
  return (
    <>
      <button
        className={`${extraBtnClass}`}
        onClick={onHandleAction}
      >
        {icon && <em className={`icon ni ${icon}`}/>}
        <span>{btnText}</span>
      </button>
    </>
  );
}

export default ActionButton;
