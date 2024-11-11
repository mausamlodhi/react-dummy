import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AcountSidebar, MetaTags, PageHeader } from "../../../../components";
import { AdminUpdateProfileForm } from "../../../../components/Form";
import { AdminAuthServices } from "../../../../services/Admin/Auth/index.service";
import { logger, modalNotification } from "../../../../utils";
import {
  selectUserData,
  updateUserData,
} from "../../../../redux/AuthSlice/index.slice";

function AdminProfile() {
  const [isEdit, setIsEdit] = useState(true);
  const { t } = useTranslation();
  const [asideView, setAsideView] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(selectUserData);
  // const data = userData;
  const dispatch = useDispatch();
  const asideToggle = () => {
    setAsideView(!asideView);
  };
  if (asideView) {
    document.querySelector("body").classList.add("toggle-shown");
  } else {
    document.querySelector("body").classList.remove("toggle-shown");
  }
  const onSubmit = async (val) => {
    setLoading(true);
    try {
      let bodyData = val;
      delete val.email;
      const res = await AdminAuthServices.updateAdminService(bodyData);
      const { success, message } = res;
      if (success) {
        setIsEdit(true);

        modalNotification({
          type: "success",
          message,
        });
        Object.assign(userData, {
          firstName: val?.firstName,
          username: val?.username,
        });
        dispatch(updateUserData(userData));
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title="" />
      <div className="nk-block">
        <div className="card">
          <div className="card-aside-wrap">
            <div className="card-inner card-inner-lg">
              <div className="nk-block-head nk-block-head-lg">
                <div className="nk-block-between">
                  <PageHeader heading="Personal Information">
                    <p>{t("text.adminUpdateProfile.basicInfo")}</p>
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
              <div className="nk-block">
                <div className="nk-data data-list">
                  <AdminUpdateProfileForm
                    onSubmit={onSubmit}
                    loading={loading}
                    t={t}
                    userData={userData}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                </div>
              </div>
            </div>
            <AcountSidebar asideView={asideView} asideToggle={asideToggle} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
