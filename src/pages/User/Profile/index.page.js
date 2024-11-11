/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  CommonButton,
  ModalComponent,
  SweetAlert,
  Input as TextInput,
} from "../../../components";
import { ImageElement, logger, modalNotification } from "../../../utils";
import userRoutesMap from "../../../routeControl/userRouteMap";
import {
  ChangePhoneNumberForm,
  UserVerificationForm,
} from "../../../components/Form";
import MyProfile from "./MyProfile";

import {
  logout,
  selectUserData,
  updateUserData,
} from "../../../redux/AuthSlice/index.slice";
import SubscriptionPlans from "./SubscriptionPlans";
import BillingHistory from "./BillingHistory";
import { UserAuthServices } from "../../../services";

function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [profileSidebar, setprofileSidebar] = useState(false);
  const [setIsCancelAlertVisible] = useState(false);
  const onCancelConfirmAlert = () => {
    setIsCancelAlertVisible(false);
    modalNotification({
      type: "success",
      message: "Subscription Cancelled Successfully",
    });
    // return true;
  };
  const [disableRenewalAlertVisible, setDisableRenewalAlertVisible] =
    useState(false);
  const onDisableConfirmAlert = () => {
    setIsCancelAlertVisible(false);
    modalNotification({
      type: "success",
      message: "Auto Renewal Disable Successfully",
    });
    // return true;
  };

  const [emailShow, setEmailShow] = useState(false);
  // const [setNewEmailShow] = useState(false);
  const [mobileShow, setMobileShow] = useState(false);
  const [switchShow, setSwitchShow] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isCancelPlan, setIsCancelPlan] = useState(false);
  const [modalType, setModalType] = useState("");
  const [counter, setCounter] = useState(60);
  const [otp, setOtp] = useState();
  const [number, setNumber] = useState();
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);
  const handleClose = () => {
    setMobileShow(false);
    setSwitchShow(false);
    setOtpShow(false);
    setUpdateSuccess(false);
    setEmailShow(false);
    // setNewEmailShow(false);
    setCounter(60);
    setNumber();
  };
  const handleEmailShow = (type) => {
    setEmailShow(true);
    setModalType(type);
  };
  // const handleNewEmailShow = () => setNewEmailShow(true);
  const handleMobileShow = (type) => {
    setMobileShow(true);
    setModalType(type);
  };
  const handleSwitchShow = () => {
    setSwitchShow(true);
  };
  const handleOtpShow = () => setOtpShow(true);
  const handleUpdateSuccessShow = () => setUpdateSuccess(true);
  const otpModalOpen = (successState) => {
    setEmailShow(false);
    setMobileShow(false);
    setOtpShow(true);
    setModalType(successState);
  };
  const otpConfirm = () => {
    setOtpShow(false);
    setUpdateSuccess(true);
    setOtp();
  };
  const sidebarOpen = () => {
    setprofileSidebar(true);
    document.querySelector("body").classList.add("overflow-hidden");
  };
  const sidebarClose = () => {
    setprofileSidebar(false);
    document.querySelector("body").classList.remove("overflow-hidden");
  };

  const navigatePlan = () => {
    navigate(userRoutesMap.PRICING.path);
  };

  // const codeData = [
  //   {
  //     id: "+91",
  //     name: "+91",
  //   },
  //   {
  //     id: "+14",
  //     name: "+14",
  //   },
  //   {
  //     id: "+4158",
  //     name: "+4158",
  //   },
  // ];

  const reSendOtp = async () => {
    try {
      let bodyData = {
        email: userData?.email,
      };
      const response = await UserAuthServices.userLogin(bodyData);
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        setCounter(60);
      } else {
        modalNotification({
          type: "error",
          message: response?.message,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  const phoneNumberVerify = async () => {
    setOTPLoading(true);
    try {
      let otpValue = "";
      for (let key in otp) {
        if (key) {
          otpValue += otp[key];
        }
      }
      if (otpValue && otpValue?.length === 6) {
        let bodyData = {
          otp: parseInt(otpValue),
        };
        const response = await UserAuthServices.otpVerify(bodyData);
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          otpConfirm();
          dispatch(updateUserData(response?.data));
        }
      } else {
        modalNotification({
          type: "error",
          message: "Please enter valid verification code",
        });
      }
    } catch (error) {
      logger(error);
    }
    setOTPLoading(false);
  };
  const changePhoneNumber = async (value) => {
    setPhoneNumberLoading(true);
    try {
      setNumber(value?.phoneNumber);
      let bodyData = { countryCode: "1", phoneNumber: value?.phoneNumber };
      const res = await UserAuthServices.updateUserPhoneNumber(bodyData);
      if (res?.success) {
        otpModalOpen("mobile");
        modalNotification({
          type: "success",
          message: res?.message,
        });

        let updatePhoneNumber = {};
        // isPhoneNumberVerified
        updatePhoneNumber = {
          ...userData,
          phoneNumber: value?.phoneNumber,
          isPhoneNumberVerified: 0,
        };

        dispatch(updateUserData(updatePhoneNumber));
      }
    } catch (error) {
      logger(error);
    }
    setPhoneNumberLoading(false);
  };

  useEffect(() => {
    let timer;
    if (counter > 0 && otpShow) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, otpShow]);

  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const userRole = userData?.userRole?.role?.role;

  const showSweetAlert = () => {
    setIsAlertVisible(true);
  };

  const onConfirmAlert = async () => {
    try {
      const response = await UserAuthServices.userLogout();
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        dispatch(logout(navigate, userRole));
        setLoading(false);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
    return true;
  };

  return (
    <>
      <div className="pageWrap">
        <Container className="profileContainer">
          <div className="myProfile">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col lg={4} xl={3}>
                  <div
                    className={`myProfile_left ${
                      profileSidebar && "sidebarOpen"
                    }`}
                  >
                    <Link
                      className="d-lg-none d-block closeIcon"
                      onClick={sidebarClose}
                    >
                      {" "}
                      <em className="icon icon-close" />
                    </Link>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first" onClick={sidebarClose}>
                          <span className="icon-user">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                          {t("text.userProfile.myProfile")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second" onClick={sidebarClose}>
                          <span className="icon-credit-card">
                            <em className="path1" />
                            <em className="path2" />
                          </span>

                          {t("text.userProfile.subScriptionPlan")}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="three" onClick={sidebarClose}>
                          <span className="icon-leave-loop">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                          {t("text.userProfile.billingHistory")}
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                      <Nav.Link eventKey="four" onClick={sidebarClose}>
                      <span className="icon-password"><em className="path1"/><em className="path2"/></span>
                      Change Password</Nav.Link>
                    </Nav.Item> */}
                      <Nav.Item>
                        <NavLink
                          to={userRoutesMap.LOGIN.path}
                          onClick={(e) => {
                            e.preventDefault();
                            showSweetAlert();
                          }}
                          className="nav-link"
                        >
                          <span className="icon-logout">
                            <em className="path1" />
                            <em className="path2" />
                          </span>
                          {t("text.common.logout")}
                        </NavLink>
                      </Nav.Item>

                      <Nav.Item>
                        <NavLink
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            // showSweetAlert();
                          }}
                          className="nav-link link-danger font-sb"
                        >
                          Delete Account
                        </NavLink>
                      </Nav.Item>
                    </Nav>
                  </div>
                </Col>
                <Col lg={8} xl={9}>
                  <div className="myProfile_right h-100">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <MyProfile
                          sidebarOpen={sidebarOpen}
                          handleEmailShow={handleEmailShow}
                          handleMobileShow={handleMobileShow}
                          otpModalOpen={otpModalOpen}
                          userData={userData}
                          changePhoneNumber={changePhoneNumber}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <SubscriptionPlans
                          handleSwitchShow={handleSwitchShow}
                          setIsCancelPlan={setIsCancelPlan}
                          sidebarOpen={sidebarOpen}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="three">
                        <BillingHistory sidebarOpen={sidebarOpen} />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
      </div>
      <ModalComponent
        show={mobileShow}
        modalExtraClass="noHeader"
        onHandleVisible={handleMobileShow}
        onHandleCancel={handleClose}
        size="sm"
      >
        <div className="modalHeader">
          <h3> {t("text.userProfile.changeMobileNumber")}</h3>
        </div>
        <ChangePhoneNumberForm
          handleClose={handleClose}
          onSubmit={changePhoneNumber}
          loading={phoneNumberLoading}
        />
      </ModalComponent>
      <ModalComponent
        show={switchShow}
        modalExtraClass="paymentSuccessModal paymentSuccessModal-lg"
        onHandleVisible={handleSwitchShow}
        onHandleCancel={handleClose}
        title=""
        size="sm"
      >
        <div className="text-center">
          <span className="icon-switch paymentSuccessModal_icon">
            <em className="path1" />
            <em className="path2" />
          </span>
          <h3 className="font-bd">{t("text.userProfile.switchingThePlan")}</h3>
          <p className="description">
            {t("text.userProfile.youHaveAlreaddyActivePlanInYourProfile")}
            <br className="d-none d-sm-block" />
            {t("text.userProfile.ifYouWantToSwitchThePlan")},{" "}
            {t("text.userProfile.pleaseClickOnContinue")}.
          </p>
          <div className="btnAction d-flex justify-content-center">
            <CommonButton variant="light" onClick={() => handleClose()}>
              {t("text.common.cancel")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => {
                handleClose();
                navigatePlan();
              }}
              className="ms-3"
            >
              {t("text.common.continue")}
            </CommonButton>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        show={otpShow}
        modalExtraClass="noHeader"
        onHandleVisible={handleOtpShow}
        onHandleCancel={handleClose}
        size="sm"
      >
        <div className="modalHeader">
          <h3>{t("text.userProfile.enterVerificationCode")}</h3>
          {modalType === "email" ? (
            <p className="mb-0">
              {t("text.userProfile.yourCurrentEmailIs")}{" "}
              <span className="text-500">jonasmerchant@gmail.com</span>{" "}
              {t("text.userProfile.sendATemporaryVerificationCodeToThisEmail")}
            </p>
          ) : (
            <p className="mb-0">
              {t(
                "text.userProfile.enterVerificationCodeSentToYourMobileNumber"
              )}{" "}
              <span className="text-500 d-block">+1{number}</span>
            </p>
          )}
        </div>

        <UserVerificationForm
          onSubmit={phoneNumberVerify}
          emailVerification={false}
          counter={counter}
          reSendOtp={reSendOtp}
          setOtp={setOtp}
          otp={otp}
          handleClose={handleClose}
          loading={otpLoading}
        />
      </ModalComponent>
      <ModalComponent
        show={updateSuccess}
        modalExtraClass="paymentSuccessModal"
        onHandleVisible={handleUpdateSuccessShow}
        onHandleCancel={handleClose}
        title=""
        size="sm"
        closeButton={false}
      >
        <div className="text-center">
          <ImageElement
            source="payment-success.svg"
            alt="payment-success"
            className="img-fluid"
          />
          {modalType === "mobile" ? (
            <h3 className="font-bd mb-0">
              {t("text.userProfile.mobileNumberChanged")}{" "}
              <br className="d-none d-sm-block" />{" "}
              {t("text.common.successfull")}
            </h3>
          ) : modalType === "verify" ? (
            <h3 className="font-bd mb-0">
              {t("text.userProfile.mobileNumberVerify")}{" "}
              <br className="d-none d-sm-block" />{" "}
              {t("text.common.successfull")}
            </h3>
          ) : (
            <h3 className="font-bd mb-0">
              {t("text.userProfile.emailIdUpdated")}{" "}
              <br className="d-none d-sm-block" />{" "}
              {t("text.common.successfully")}
            </h3>
          )}
          <div className="btnAction">
            <CommonButton variant="primary" onClick={() => handleClose()}>
              {t("text.common.okay")}
            </CommonButton>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        show={emailShow}
        modalExtraClass="noHeader"
        onHandleVisible={handleEmailShow}
        onHandleCancel={handleClose}
        title=""
        size="sm"
      >
        <div className="modalHeader">
          <h3>{t("text.userProfile.changeEmailAddress")}</h3>
        </div>
        <div className="modalForm">
          <div className="form-group w-100">
            <label className="form-label">
              {t("text.userProfile.newEmailAddress")}
            </label>
            <div className="form-control-wrap">
              <TextInput
                id="email"
                className="form-control form-control-lg"
                name="name"
                disabled={false}
                variant="standard"
                type="email"
                placeholder={t("text.userProfile.emailAddressPlaceholder")}
              />
            </div>
          </div>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => handleClose()} variant="light">
              {t("text.common.camcel")}
            </CommonButton>
            <CommonButton
              variant="primary"
              onClick={() => otpModalOpen("email")}
              className="ms-3"
            >
              {t("text.common.submit")}
            </CommonButton>
          </div>
        </div>
      </ModalComponent>

      {/* <ModalComponent
        backdrop
        show={isCancelPlan}
        onHandleCancel={setIsCancelPlan}
        size="sm"
        title="Are you sure?"
        // extraClassName="removeModal"
      >
        <>
          <p className="mb-0">On cancellation of this plan, the plan's validity period will remain until its expiration date and Auto-Renewal will be deactivated</p>
          <div className="text-end modalFooter">
            <CommonButton onClick={() => setIsCancelPlan(false)} variant="light">Cancel</CommonButton>
            <CommonButton  variant="primary" onClick={() => setIsCancelPlan(false)} className="ms-2 ms-md-3">Confirm</CommonButton>
          </div>
        </>
      </ModalComponent> */}

      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.userProfile.planCancellation")}
        show={isCancelPlan}
        icon="warning"
        showCancelButton
        cancelButtonText={t("text.common.no")}
        confirmButtonText={t("text.common.yes")}
        setIsAlertVisible={setIsCancelPlan}
        // showLoaderOnConfirm
        // loading={loading}
        onConfirmAlert={onCancelConfirmAlert}
      />
      <SweetAlert
        title={t("text.common.areYouSure")}
        text={t("text.userProfile.youWantToDisableRenewal")}
        show={disableRenewalAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setDisableRenewalAlertVisible}
        // showLoaderOnConfirm
        // loading={loading}
        onConfirmAlert={onDisableConfirmAlert}
      />

      <SweetAlert
        reverseButtons
        title={t("text.common.wantToLogout")}
        text={t("text.common.areYouSureLogout")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        cancelButtonText={t("text.common.no")}
        confirmButtonText={t("text.common.yes")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
    </>
  );
}

export default Profile;
