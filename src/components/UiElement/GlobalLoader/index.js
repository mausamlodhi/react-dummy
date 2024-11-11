import React from "react";
import Spinner from "react-bootstrap/Spinner";

function GlobalLoader({ extraClasses }) {
  return (
    <div className="text-center">
      <Spinner animation="border" className={`text-500 ${extraClasses}`} />
    </div>
  );
}
export default GlobalLoader;
