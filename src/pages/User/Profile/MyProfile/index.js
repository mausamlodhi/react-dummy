import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AntTooltip, UserProfileForm } from "../../../../components";
import { logger, modalNotification } from "../../../../utils";

import { updateUserData } from "../../../../redux/AuthSlice/index.slice";
import { UserAuthServices } from "../../../../services";

export default function MyProfile({
  sidebarOpen,
  handleEmailShow,
  handleMobileShow,
  otpModalOpen,
  changePhoneNumber,
  userData,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    setIsEdit(true);
    try {
      let bodyData = { ...value };

      const response = await UserAuthServices.updateUserProfile(
        bodyData,
        userData?.userRole?.id
      );
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        setIsEdit(false);
        dispatch(updateUserData(response?.data));
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     getProfileDetails();
  //   }, []);
  return (
    <>
      <div className="d-flex justify-content-between head">
        <h2 className="title mb-0"> {t("text.userProfile.myProfile")}</h2>
        <Link className="d-lg-none toggleIcon" onClick={sidebarOpen}>
          <em className="icon-menu-bar" />{" "}
        </Link>
      </div>

      <UserProfileForm
        handleEmailShow={handleEmailShow}
        handleMobileShow={handleMobileShow}
        userData={userData}
        onSubmit={onSubmit}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        loading={loading}
      />
      <Row>
        <Col lg="12">
          <div className="borderSec" />
        </Col>
        <Col lg="6">
          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="name">
                {t("text.userProfile.emailId")}
                <AntTooltip
                  promptText={`${
                    userData?.isEmailVerified === 1
                      ? "Verified"
                      : "Not Verified"
                  }`}
                >
                  <em
                    className={`ms-2 icon-verify ${
                      userData?.isEmailVerified === 1
                        ? "verified"
                        : "icon-notverified"
                    }`}
                  />
                </AntTooltip>
              </label>
            </div>
            <div className="form-control-wrap">
              <input
                id="name"
                className="form-control form-control-lg"
                name="name"
                type="name"
                placeholder={t("text.userProfile.enterEmailId")}
                // setFieldValue={props.handleChange}
                icon=""
                value={userData?.email}
                disabled
              />
              {/* <div className="text-end">
              <Link
                to="#"
                className="changeLink font-sb"
                // onClick={() => handleEmailShow("email")}
              >
                {t("text.userProfile.changeEmail")}
              </Link>
            </div> */}
            </div>
          </div>
        </Col>
        <Col lg="6">
          <div className="form-group">
            <div className="form-label-group d-flex align-item-center">
              <label className="form-label" htmlFor="name">
                {t("text.common.phoneNumber")}
                <AntTooltip
                  promptText={`${
                    userData?.isPhoneNumberVerified === 1
                      ? "Verified"
                      : "Not Verified"
                  }`}
                >
                  <em
                    className={`ms-2 icon-verify ${
                      userData?.isPhoneNumberVerified === 1
                        ? "verified"
                        : "icon-notverified"
                    }`}
                  />
                </AntTooltip>
              </label>
              {userData?.isPhoneNumberVerified !== 1 && (
                <div className="ms-auto">
                  <Link
                    to="#"
                    className="changeLink font-sb mt-0"
                    onClick={() => {
                      otpModalOpen("verify");
                      changePhoneNumber({ phoneNumber: userData?.phoneNumber });
                    }}
                  >
                    {t("text.userProfile.verifyNumber")}
                  </Link>
                </div>
              )}
            </div>
            <div className="form-control-wrap phoneNumber">
              <input
                className="form-control"
                placeholder={t("text.userProfile.phoneNumber")}
                type="text"
                value={userData?.phoneNumber}
                disabled
              />
            </div>
            <div className="text-end">
              <Link
                to="#"
                className="changeLink font-sb"
                onClick={() => handleMobileShow("mobile")}
              >
                {t("text.userProfile.changePhoneNumber")}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
