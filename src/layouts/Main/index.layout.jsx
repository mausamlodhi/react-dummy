import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import "../../styles/scss/frontend/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import { routesList } from "../../routes";
// import { AppLayout } from "..";

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    let pathPattern = /[\/]$/g;
    if (pathPattern.test(pathname)) {
      navigate(pathname.replace(pathPattern, ""), { replace: true });
    }
    window.scrollTo(0, 0);
    if (typeof window !== "undefined") {
      function updateSize() {
        const header = document.getElementsByClassName("header")[0];
        const collapsed = document.getElementById("navbarSupportedContent");
        if (header && collapsed) {
          if (collapsed && window.innerWidth <= 991) {
            document.body.style.paddingTop = `${
              header.offsetHeight - collapsed.offsetHeight
            }px`;
          } else {
            document.body.style.paddingTop = `${header.offsetHeight}px`;
          }
        }
      }
      window.addEventListener("resize", updateSize);
      window.addEventListener("hashchange", updateSize);
      setTimeout(() => {
        updateSize();
      }, 100);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default MainLayout;
