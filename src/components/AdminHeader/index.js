import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  modalNotification,
  textFormatter,
  logger,
  removeLocalStorageToken,
} from "utils";
import adminRouteMap from "routeControl/adminRouteMap";
import { selectUserData, logout } from "redux/AuthSlice/index.slice";
import { AdminAuthServices } from "services/Admin/Auth/index.service";
import { ImageElement, SweetAlert } from "../UiElement";
import { nameFormatter } from "../Formatter";

function AdminHeader({ menuToggle }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const userData = useSelector(selectUserData);

  const userRole = userData?.userRole?.role?.role;
  const dispatch = useDispatch();
  const showSweetAlert = () => {
    setIsAlertVisible(true);
  };

  const onConfirmAlert = async () => {
    setLoading(true);
    try {
      const res = await AdminAuthServices.logoutService();
      if (res?.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
      }
      removeLocalStorageToken();
      dispatch(logout(navigate, userRole));
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Link
              onClick={() => menuToggle()}
              to="#"
              className="nk-nav-toggle nk-quick-nav-icon ps-0"
            >
              <em className="icon ni ni-menu" />
            </Link>
          </div>
          <div className="nk-header-brand d-xl-none">
            <Link to={adminRouteMap.DASHBOARD.path} className="logo-link">
              <ImageElement
                className="logo-img"
                previewSource="/assets/images/admin/logo-dark.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <Dropdown as="li" className="notification-dropdown">
                <Dropdown.Toggle
                  as="a"
                  className="nk-quick-nav-icon btn-icon btn-icon-break p-0"
                >
                  <div className="badge badge-circle align-items-center bg-primary">
                    5
                  </div>
                  <em className="ni ni-bell" />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="dropdown-menu-xl">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">
                      Notifications
                    </span>
                    <Link className="text-info" to="#">
                      Mark All Read
                    </Link>
                  </div>
                  <div className="dropdown-body">
                    <div className="nk-notification">
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            You have requested to <span>Widthdrawl</span>
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            Your <span>Deposit Order</span> is placed
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            You have requested to <span>Widthdrawl</span>
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            Your <span>Deposit Order</span> is placed
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            You have requested to <span>Widthdrawl</span>
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">
                            Your <span>Deposit Order</span> is placed
                          </div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-foot center">
                    <Link
                      className="text-info"
                      to={adminRouteMap.ADMIN_NOTIFICATIONS.path}
                      onClick={() => {
                        document.body.click();
                      }}
                    >
                      View All
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown as="li" className="user-dropdown">
                <Dropdown.Toggle as="a" className="me-n1" id="dropdown-basic">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <ImageElement
                        previewSource={userData?.profileImageUrl}
                        className="img-fluid"
                        alt="profile"
                        origin="anonymous"
                      />
                    </div>
                    <div className="user-info d-none d-xl-block">
                      {/* <div className="user-status user-status-unverified">Unverified</div> */}
                      <div className="user-name dropdown-indicator">
                        {nameFormatter(userData?.firstName, userData?.lastName)}
                      </div>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="dropdown-menu-md">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        {/* <span>AB</span> */}
                        <ImageElement
                          previewSource={userData?.profileImageUrl}
                          className="img-fluid"
                          alt="profile"
                          origin="anonymous"
                        />
                      </div>
                      <div className="user-info">
                        <span className="lead-text">
                          {nameFormatter(
                            userData?.firstName,
                            userData?.lastName
                          )}
                        </span>
                        <span className="sub-text">
                          {textFormatter(userData?.email)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link
                          to={adminRouteMap.ADMIN_PROFILE.path}
                          onClick={() => {
                            document.body.click();
                          }}
                        >
                          <em className="icon ni ni-user-alt" />
                          <span>{t("text.common.viewProfile")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={adminRouteMap.ADMIN_CHANGE_PASSWORD.path}
                          onClick={() => {
                            document.body.click();
                          }}
                        >
                          <em className="icon ni ni-lock-alt-fill" />
                          <span>{t("text.adminAuth.changePassword")}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link
                          to="/"
                          onClick={(e) => {
                            e.preventDefault();
                            showSweetAlert();
                          }}
                        >
                          <em className="icon ni ni-signout" />
                          <span>{t("text.common.signOut")}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Dropdown.Menu>
                <SweetAlert
                  reverseButtons
                  title="Logout"
                  text="Are you sure want to logout?"
                  show={isAlertVisible}
                  icon="warning"
                  showCancelButton
                  cancelButtonText="No"
                  confirmButtonText="Yes"
                  setIsAlertVisible={setIsAlertVisible}
                  showLoaderOnConfirm
                  loading={loading}
                  onConfirmAlert={onConfirmAlert}
                />
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
