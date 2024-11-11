import { Form, Formik } from "formik";
import React from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import { CommonButton, Input as TextInput } from "../../..";
import adminRouteMap from "../../../../routeControl/adminRouteMap";

function ForgotPasswordForm({ onSubmit, loading }) {
  const initialValues = {
    email: "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e) => {
        onSubmit(e);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <>
            <Form>
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">
                    {i18next.t("text.adminAuth.forgotPasswordLink")}
                  </h4>
                  <div className="nk-block-des">
                    <p>{i18next.t("text.adminAuth.forgotPasswordTitle")}.</p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="email">
                    {i18next.t("text.adminAuth.email")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <TextInput
                    id="email"
                    className="form-control form-control-lg"
                    name="email"
                    variant="standard"
                    type="text"
                    placeholder={i18next.t("text.adminAuth.emailPlaceholder")}
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <CommonButton
                  htmlType="submit"
                  type="submit"
                  loading={loading}
                  // variant="warning"
                  extraClassName="btn btn-lg btn-primary btn-block"
                  //   onClick={() => navigate(adminRouteMap.OTP_VERIFICATION.path)}
                >
                  {i18next.t("text.adminAuth.send")}
                </CommonButton>
              </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              <Link to={adminRouteMap.LOGIN.path} className="text-info">
                <strong>{i18next.t("text.adminAuth.backToSignIn")}</strong>
              </Link>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default ForgotPasswordForm;
