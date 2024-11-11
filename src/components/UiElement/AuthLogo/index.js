import React from "react";
import { Link } from "react-router-dom";
import adminRouteMap from "../../../routeControl/adminRouteMap";

function AuthLogo() {
  return (
    <>
      <div className="brand-logo pb-4 text-center">
        <Link to={adminRouteMap.LOGIN.path} className="logo-link">
          <img
            className="logo-dark logo-img logo-img-xl"
            src="../assets/images/admin/logo-dark.svg"
            srcSet="/assets/images/admin/logo-dark.svg"
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
}

export default AuthLogo;
