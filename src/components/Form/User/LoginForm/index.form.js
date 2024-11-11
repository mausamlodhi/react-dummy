import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput, RippleEffect } from "../../..";
import { validation } from "./validation";

export default function UserLoginForm({ onSubmit, loading }) {
  const { t } = useTranslation();
  let initialValues = {
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
          <Form>
            <div className="d-flex flex-column authPage_form_field">
              <div className="authPage_form_head">
                <h1 className="font-bd">
                  {t("text.userAuth.getStartedLoopity")}
                </h1>
                <span> {t("text.userAuth.workEmailAddressToContinue")}</span>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="name">
                    {t("text.common.emailId")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <TextInput
                    id="email"
                    className="form-control form-control-lg"
                    name="email"
                    variant="standard"
                    type="text"
                    placeholder="Enter Email id"
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
              <RippleEffect>
                <CommonButton
                  loading={loading}
                  htmlType="submit"
                  type="submit"
                  variant="warning"
                  extraClassName="w-100 authPage_form_signUp"
                >
                  {" "}
                  <em className="icon-circle-next icon-left" />{" "}
                  {t("text.common.loginOrCreate")}
                </CommonButton>
              </RippleEffect>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
