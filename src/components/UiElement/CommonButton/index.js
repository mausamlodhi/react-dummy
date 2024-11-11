import React from "react";
import { Button } from "react-bootstrap";

function CommonButton({
  children,
  variant = "none",
  loading,
  extraClass = "",
  ...rest
}) {
  return (
    <Button
      disabled={loading}
      variant={variant}
      className={`btn btn-primary ripple-effect-dark ${extraClass}`}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CommonButton;
