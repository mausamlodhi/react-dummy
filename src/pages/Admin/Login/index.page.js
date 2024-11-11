import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogo } from "../../../components";
import {
  logger,
  modalNotification,
  setLocalStorageToken,
} from "../../../utils";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { AdminLoginForm } from "../../../components/Form/Admin";
import { AdminAuthServices } from "../../../services/Admin/Auth/index.service";
import {
  getAdminAuthData,
  login,
  updateAdminAuthData,
} from "../../../redux/AuthSlice/index.slice";

function Login() {
  // const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  let adminAuthData = useSelector(getAdminAuthData);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const bodyData = {
        ...value,
        deviceId: "string",
        deviceType: "web",
        firebaseToken: "string",
      };
      delete bodyData.rememberMe;
      // bodyData.userRole = user;
      const res = await AdminAuthServices.userLogin(bodyData);
      const { data, success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        let resData = { ...data };
        resData.rememberMe = checked;
        // resData.rememberMe = value.rememberMe;
        dispatch(login(resData));
        setLocalStorageToken(res?.data?.token);
        if (resData?.userRole?.role?.role === "admin") {
          if (checked) {
            bodyData.rememberMe = checked;
            dispatch(updateAdminAuthData(bodyData));
          } else {
            dispatch(updateAdminAuthData({}));
          }
        }
        if (resData?.userRole?.role?.role === "admin") {
          navigate(adminRouteMap.DASHBOARD.path);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
        <AuthLogo />
        <div className="card">
          <div className="card-inner card-inner-lg">
            <div className="nk-block-head">
              <div className="nk-block-head-content">
                <h4 className="nk-block-title">{t("text.adminAuth.signin")}</h4>
                <div className="nk-block-des">
                  <p>{t("text.adminAuth.signInPageParagraph")}</p>
                </div>
              </div>
            </div>
            <AdminLoginForm
              onSubmit={onSubmit}
              adminAuthData={adminAuthData}
              checked={checked}
              setChecked={setChecked}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
