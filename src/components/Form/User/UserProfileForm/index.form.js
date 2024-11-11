import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import React from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import { CommonButton, Input as TextInput, Upload } from "../../..";
import Media from "../../../../apiEndPoints/Media";

export default function UserProfileForm({
  onSubmit,
  userData,
  setIsEdit,
  isEdit,
  loading,
}) {
  const { t } = useTranslation();

  let initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    companyName: userData?.companyName || "",
    profileImage: userData?.profileImage || "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      //   validationSchema={validation()}
      onSubmit={(e) => {
        onSubmit(e);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form className="profileForm">
            <div className="myProfile_profile text-center">
              <div className="position-relative uploadPhoto">
                <Upload
                  name="profileImage"
                  apiEndPoints={Media?.userProfileImage}
                  type="file"
                  disabled={!isEdit}
                  defaultImageUrl={userData?.profileImageUrl}
                  setFieldValue={props.handleChange}
                  formItem={false}
                >
                  {isEdit && (
                    <Tooltip
                      placement="top"
                      promptText={t("text.common.imageTooltip")}
                    >
                      <label
                        className="filelabel mt-5 position-absolute d-flex align-items-center justify-content-center uploadPhoto_icon"
                        data-toggle="tooltip"
                      >
                        <span className="icon-camera">
                          <em className="path1" />
                          <em className="path2" />
                          <em className="path3" />
                        </span>
                      </label>
                    </Tooltip>
                  )}
                </Upload>
                {/* <div className="position-absolute d-flex align-items-center justify-content-center uploadPhoto_icon"></div> */}

                {/* </ImgCrop> */}
              </div>
              <h1>{`${userData?.firstName ? userData?.firstName : ""} ${
                userData?.lastName ? userData?.lastName : ""
              }`}</h1>
              <p className="mb-0">{userData?.email}</p>
            </div>
            <Row>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.common.firstName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="firstName"
                      className="form-control form-control-lg"
                      name="firstName"
                      variant="standard"
                      type="text"
                      placeholder={t("text.common.firstName")}
                      setFieldValue={props.handleChange}
                      icon=""
                      defaultValue="Jonas"
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.common.lastName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="lastName"
                      className="form-control form-control-lg"
                      name="lastName"
                      variant="standard"
                      type="text"
                      placeholder={t("text.common.firstName")}
                      setFieldValue={props.handleChange}
                      icon=""
                      defaultValue="Merchant"
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("text.userAuth.companyName")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <TextInput
                      id="companyName"
                      className="form-control form-control-lg"
                      name="companyName"
                      variant="standard"
                      type="text"
                      placeholder={t("text.userAuth.companyName")}
                      setFieldValue={props.handleChange}
                      icon=""
                      defaultValue="Tectonic"
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </Col>
              {!isEdit ? (
                <Col lg="12" className="proileBtn">
                  <CommonButton
                    variant="primary"
                    onClick={() => setIsEdit(true)}
                  >
                    <em className="icon icon-circle-next me-2" />
                    {t("text.common.editProfile")}
                  </CommonButton>
                </Col>
              ) : (
                <Col lg="12" className="proileBtn">
                  <CommonButton
                    variant="light"
                    onClick={() => setIsEdit(false)}
                  >
                    {t("text.common.cancel")}
                  </CommonButton>
                  <CommonButton
                    variant="primary"
                    extraClassName="ms-3"
                    htmlType="submit"
                    type="submit"
                    loading={loading}
                  >
                    <em className="icon icon-circle-next me-2" />
                    {t("text.common.saveChanges")}
                  </CommonButton>
                </Col>
              )}
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}
