/*eslint-disable*/

import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
// import { AppLayout } from "..";
import { moduleRoutesList } from "../../route";
import { AdminFooter, AdminHeader, Sidebar } from "../../components";
import AppLayout from "../App/index.layout";
// import { selectUserData } from "../../redux/AuthSlice/index.slice";
// import { routesList } from "../../routes/index";

let routeList = moduleRoutesList();

function AdminPrivateLayout() {
  // const userData = useSelector(selectUserData);
  let routeList = moduleRoutesList();
  const navigate = useNavigate();
  const [redirectpath, setRedirectPath] = useState("");

  useEffect(() => {
    if (redirectpath) {
      navigate(redirectpath);
    }
  }, [redirectpath]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuToggle = () => {
    if (window.innerWidth <= 1199) {
      setSidebarOpen(!sidebarOpen);
      const list = document.querySelector("body");
      list?.classList.toggle("nav-shown");
    }
  };

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <div className="nk-body bg-lighter npc-general has-sidebar">
        <div className="nk-app-root">
          <div className="nk-main ">
            <Sidebar
              sidebarOpen={sidebarOpen}
              menuToggle={menuToggle}
              routes={routeList.admin}
            />
            {sidebarOpen ? (
              <div
                onClick={() => menuToggle()}
                className="nk-sidebar-overlay"
              />
            ) : (
              ""
            )}
            <div className="nk-wrap">
              <AdminHeader menuToggle={menuToggle} />
              <div className="nk-content">
                <div className="container-fluid">
                  <div className="nk-content-inner">
                    <div className="nk-content-body">
                      <Outlet />
                    </div>
                  </div>
                </div>
              </div>
              <AdminFooter />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminPrivateLayout;
