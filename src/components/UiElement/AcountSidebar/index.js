import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import Media from "../../../apiEndPoints/Media";

import { checkValidData, logger, modalNotification } from "../../../utils";
import { AdminAuthServices } from "../../../services/Admin/Auth/index.service";
import {
  selectUserData,
  updateUserDataAction,
} from "../../../redux/AuthSlice/index.slice";
import { GlobalLoader, ImageElement } from "..";

function AcountSidebar({ asideView, asideToggle }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageUrl] = useState();
  // const [profileData, setProfileData] = useState();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  console.log(imageURL);

  const handleProfileImage = async (imagePath) => {
    setLoading(true);
    try {
      let bodyData = {
        profileImage: imagePath,
      };
      const res = await AdminAuthServices.updateProfileImageService(bodyData);
      const { success, data, message } = res;
      if (success) {
        dispatch(updateUserDataAction(data));
        modalNotification({
          type: "success",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else {
      const { status, response } = info.file;
      if (status === "done") {
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        handleProfileImage(response.data.basePath);
      } else if (status === "error") {
        setLoading(false);
        modalNotification({
          type: "error",
          message: info?.fileList[0]?.response?.message,
          description: `${info.file.name} file upload failed. ${info.file.response.detail}`,
        });
      }
    }
  };

  return (
    <>
      <div
        className={` min-vh-auto card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
          asideView ? "content-active" : ""
        }`}
      >
        <div className="card-inner-group" data-simplebar>
          <div className="card-inner">
            <div className="user-card">
              <div className="user-avatar bg-primary">
                {loading ? (
                  <GlobalLoader />
                ) : (
                  <ImageElement
                    previewSource={userData?.profileImageUrl}
                    className="img-fluid"
                    alt="profile"
                    origin="anonymous"
                  />
                )}
              </div>
              <div className="user-info">
                <span className="lead-text">
                  {checkValidData(userData?.firstName)}
                </span>
                <span className="sub-text">
                  {" "}
                  {checkValidData(userData?.email)}
                </span>
              </div>
              <div className="user-action">
                <Dropdown>
                  <Dropdown.Toggle
                    as="a"
                    className="btn btn-icon btn-trigger me-n2"
                  >
                    <em className="icon ni ni-more-v" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <ul className="link-list-opt no-bdr">
                      <li>
                        {/* <Upload
                          name="profileImage"
                          apiEndPoints={Media?.userProfileImage}
                          type="file"
                          onChange={handleChange}
                          // disabled={!isEdit}
                          // defaultImageUrl={userData?.profileImageUrl || ""}
                          // setFieldValue={props.handleChange}
                        >
                          {" "}
                          <Link to="#">
                            <em className="icon ni ni-camera-fill" />
                            <span>Change Photo</span>
                          </Link>
                        </Upload> */}
                        <ImgCrop
                          // aspect={54 / 19}
                          quality={1}
                          // beforeCrop={beforeCrop}
                          modalProps={{
                            transitionName: "",
                            maskTransitionName: "",
                          }}
                        >
                          <Upload
                            action={Media?.userProfileImage}
                            onChange={handleChange}
                          >
                            <Link to="#">
                              <em className="icon ni ni-camera-fill" />
                              <span>{t("text.common.changePhoto")}</span>
                            </Link>
                          </Upload>
                          {/* <Upload
                            action={Media?.userProfileImage}
                            onChange={handleChange}
                          >
                            <Link to="#">
                              <em className="icon ni ni-camera-fill" />
                              <span>Change Photo</span>
                            </Link>
                          </Upload> */}
                        </ImgCrop>
                      </li>
                      {/* <li><Link to="#"><em className="icon ni ni-edit-fill"/><span>Update Profile</span></Link></li> */}
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="card-inner p-0">
            <ul className="link-list-menu">
              <Link
                className={
                  location.pathname === adminRouteMap.ADMIN_PROFILE.path
                    ? "active"
                    : ""
                }
                to={adminRouteMap.ADMIN_PROFILE.path}
              >
                <em className="icon ni ni-user-fill-c" />
                <span>{t("text.adminUpdateProfile.personalInformation")}</span>
              </Link>
              <Link
                className={
                  location.pathname === adminRouteMap.ADMIN_CHANGE_PASSWORD.path
                    ? "active"
                    : ""
                }
                to={adminRouteMap.ADMIN_CHANGE_PASSWORD.path}
              >
                <em className="icon ni ni-lock-alt-fill" />
                <span>{t("text.adminAuth.changePassword")}</span>
              </Link>
              {/* <li><Link className="active" to={adminRouteMap.ADMIN_PROFILE.path}><em className="icon ni ni-user-fill-c"/><span>Personal Infomation</span></Link></li>
                        <li><Link to={adminRouteMap.ADMIN_CHANGE_PASSWORD.path}><em className="icon ni ni-lock-alt-fill"/><span>Change Password</span></Link></li> */}
            </ul>
          </div>
        </div>
      </div>
      {asideView ? (
        <div
          onClick={() => asideToggle()}
          className="toggle-overlay"
          data-target="userAside"
        />
      ) : (
        ""
      )}
    </>
  );
}

export default AcountSidebar;
