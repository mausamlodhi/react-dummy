import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppLayout from "../App/index.layout";
// import AppLayout from "../Auth/index.layout";

function AdminPublicLayout() {
  const navigate = useNavigate();
  const [redirectpath, setRedirectPath] = useState("");

  useEffect(() => {
    if (redirectpath) {
      navigate(redirectpath);
    }
  }, [redirectpath]);

  return (
    <AppLayout setRedirectPath={setRedirectPath}>
      <div className="nk-body bg-lighter npc-general pg-auth no-touch nk-nio-theme">
        <div className="nk-app-root">
          <div className="nk-main ">
            <div className="nk-wrap nk-wrap-nosidebar">
              <div className="nk-content ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminPublicLayout;
