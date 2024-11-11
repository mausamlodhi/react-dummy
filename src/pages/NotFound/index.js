import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { modalNotification } from "../../utils";
import userRoutesMap from "../../routeControl/userRouteMap";
import adminRoutesMap from "../../routeControl/adminRouteMap";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    let path = "";
    if (pathname.search("admin") >= 0) {
      path = adminRoutesMap.LOGIN.path;
    } else {
      path = userRoutesMap.LOGIN.path;
    }
    modalNotification({
      type: "error",
      message: "Page Not Found",
    });
    navigate(path);
  }, []);
  return <></>;
}

export default NotFound;
