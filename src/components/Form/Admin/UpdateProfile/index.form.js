import { Form, Formik } from "formik";
import React from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { Input as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function AdminUpdateProfileForm({
  onSubmit,
  loading,
  t,
  userData,
  isEdit,
  setIsEdit,
}) {
  const initialValues = {
    firstName: userData?.firstName || "",
    username: userData?.username || "",
    email: userData?.email || "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(values) => {
        onSubmit(values, "profile");
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <div className="nk-block wide-xs">
            <Form className="w-100">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name">
                  {i18next.t("text.adminUpdateProfile.fullName")}
                </label>
                <TextInput
                  id="firstName"
                  className="form-control form-control-lg"
                  name="firstName"
                  disabled={isEdit}
                  variant="standard"
                  type="text"
                  placeholder={t("text.adminUpdateProfile.fullNamePlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="display-name">
                  {t("text.adminUpdateProfile.displayName")}
                </label>
                <TextInput
                  id="display-name"
                  className="form-control form-control-lg"
                  name="username"
                  disabled={isEdit}
                  variant="standard"
                  type="text"
                  placeholder={t(
                    "text.adminUpdateProfile.displayNamePlaceholder"
                  )}
                  icon=""
                  setFieldValue={props.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  {t("text.adminAuth.email")}
                </label>
                <TextInput
                  id="email"
                  className="form-control form-control-lg"
                  name="email"
                  disabled
                  variant="standard"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              {isEdit ? (
                <div>
                  <Link
                    to="#"
                    // onClick={() => handleButton("edit")}
                    onClick={() => setIsEdit(false)}
                    className="btn btn-lg btn-primary"
                  >
                    {t("text.common.edit")}
                  </Link>
                </div>
              ) : (
                <div className="flex-wrap flex-sm-nowrap">
                  <CommonButton
                    htmltype="button"
                    type="submit"
                    className="btn btn-lg btn-primary"
                    loading={loading}
                  >
                    {t("text.adminUpdateProfile.title")}
                  </CommonButton>

                  <Link
                    to="#"
                    onClick={() => setIsEdit(true)}
                    className="btn btn-light btn-lg ms-2"
                  >
                    {t("text.common.cancel")}
                  </Link>
                </div>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default AdminUpdateProfileForm;
