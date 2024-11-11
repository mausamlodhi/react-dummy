import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { AuthLogo } from "../../../components";
import { logger, modalNotification } from "../../../utils";
import { ResetPasswordForm } from "../../../components/Form";
import { AdminAuthServices } from "../../../services/Admin/Auth/index.service";

function ResetPassword() {
  const { t } = useTranslation();
  const { token } = useParams();
  // const passwordReset = () => {
  //   modalNotification({
  //     type: "success",
  //     message: "Password Reset Successfully",
  //   });
  //   setTimeout(() => {
  //     navigate(adminRouteMap.LOGIN.path);
  //   }, 2000);
  // };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let bodyData = { ...values };
      bodyData.token = token;
      const response = await AdminAuthServices.resetPasswordService(bodyData);
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        // dispatch(resetPassword());
        navigate(adminRouteMap.LOGIN.path);
      } else {
        modalNotification({
          type: "error",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  return (
    <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
      <AuthLogo />
      <div className="card">
        <div className="card-inner card-inner-lg">
          <div className="nk-block-head">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">{t("text.adminAuth.title")}</h4>
              <div className="nk-block-des">
                <p>{t("text.adminAuth.resetDescription")}</p>
              </div>
            </div>
          </div>
          <ResetPasswordForm t={t} onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
