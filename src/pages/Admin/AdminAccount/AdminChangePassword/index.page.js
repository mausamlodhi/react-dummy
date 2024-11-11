import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  // Password as TextPassword,
  // CommonButton,
  PageHeader,
  AcountSidebar,
} from "../../../../components/index";
import { logger, modalNotification } from "../../../../utils";
import { AdminChangePasswordForm } from "../../../../components/Form";
import { AdminAuthServices } from "../../../../services/Admin/Auth/index.service";

function AdminChangePassword() {
  const [asideView, setAsideView] = useState(false);

  const { t } = useTranslation();
  // const [currentPassword, setCurrentPassword] = useState(false);
  // const [newPassword, setNewPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false,
  });
  const asideToggle = () => {
    setAsideView(!asideView);
  };
  const updatePassword = async (values, resetForm) => {
    setLoading(true);
    try {
      let bodyData = {
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmPassword,
      };
      const response = await AdminAuthServices.changePasswordService(bodyData);
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        resetForm();
        setCheckRegex({});
        // navigate(adminRoutesMap.OTP_VERIFICATION.path);
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

  if (asideView) {
    document.querySelector("body").classList.add("toggle-shown");
  } else {
    document.querySelector("body").classList.remove("toggle-shown");
  }
  return (
    <>
      <div className="nk-block">
        <div className="card">
          <div className="card-aside-wrap">
            <div className="card-inner card-inner-lg">
              <div className="nk-block-head nk-block-head-lg">
                <div className="nk-block-between">
                  <PageHeader heading="Change Password">
                    <p>{t("text.adminUpdateProfile.setUniqPassword")}</p>
                  </PageHeader>
                  <div className="nk-block-head-content align-self-start d-lg-none">
                    <Link
                      to="#"
                      onClick={() => asideToggle()}
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${
                        asideView ? "active" : ""
                      }`}
                    >
                      <em className="icon ni ni-menu-alt-r" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="nk-block wide-xs">
                <AdminChangePasswordForm
                  t={t}
                  onSubmit={updatePassword}
                  loading={loading}
                  checkRegex={checkRegex}
                  setCheckRegex={setCheckRegex}
                />
              </div>
            </div>
            <AcountSidebar asideView={asideView} asideToggle={asideToggle} />
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminChangePassword;
