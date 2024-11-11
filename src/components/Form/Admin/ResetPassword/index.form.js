import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Password as TextPassword, CommonButton } from "../../../index";
import validation from "./validation";

function ResetPasswordForm({ onSubmit, t, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false,
  });
  const onPasswordChange = (e) => {
    let data = e;
    // setNewPassword(e.target.value);
    let stateData = { ...checkRegex };
    let upperCasePattern = /[A-Z]/g;
    let specialCharacterPattern =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{1,}$/;
    let lengthPattern = /^.{6,15}$/g;
    stateData.capital = upperCasePattern.test(data);
    stateData.number = specialCharacterPattern.test(data);
    stateData.length = lengthPattern.test(data);
    setCheckRegex(stateData);
  };
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const onFormSubmit = (value) => {
    if (checkRegex.capital && checkRegex.length && checkRegex.number) {
      onSubmit(value);
    }
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e, { resetForm }) => {
        onFormSubmit(e, resetForm);
      }}
      validate={(e) => {
        onPasswordChange(e.newPassword);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <>
            <Form>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    {t("text.adminAuth.newPassword")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <TextPassword
                    className="form-control form-control-lg"
                    name="newPassword"
                    placeholder={t("text.adminAuth.newPasswordPlaceholder")}
                    setFieldValue={props.handleChange}
                    type={showPassword ? "text" : "password"}
                    toggleIcon={
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        className="form-icon lg form-icon-right passcode-switch"
                        data-target="password"
                      >
                        <em
                          className={`passcode-icon icon-show icon ni ni-eye${
                            showPassword ? "" : "-off"
                          } `}
                        />
                      </Link>
                    }
                    icon=""
                  />
                </div>
              </div>

              <div className="form-group passwordInfo">
                <h6>{t("text.adminAuth.passwordContain")}</h6>
                <p
                  className={`text-${
                    checkRegex.capital ? "success" : "danger"
                  } mb-1`}
                >
                  <em className="icon ni ni-check" />{" "}
                  {t("text.adminAuth.letter")}
                </p>
                <p
                  className={`text-${
                    checkRegex.number ? "success" : "danger"
                  } mb-1`}
                >
                  <em className="icon ni ni-check" />
                  {t("text.adminAuth.number")}
                </p>
                <p
                  className={`text-${
                    checkRegex.length ? "success" : "danger"
                  } mb-1`}
                >
                  <em className="icon ni ni-check" /> {t("text.adminAuth.long")}
                </p>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    {t("text.adminAuth.confirmPassword")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <TextPassword
                    className="form-control form-control-lg"
                    name="confirmPassword"
                    placeholder={t("text.adminAuth.confirmPasswordPlaceholder")}
                    setFieldValue={props.handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    toggleIcon={
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        className="form-icon lg form-icon-right passcode-switch"
                        data-target="password"
                      >
                        <em
                          className={`passcode-icon icon-show icon ni ni-eye${
                            showConfirmPassword ? "" : "-off"
                          } `}
                        />
                      </Link>
                    }
                    icon=""
                  />
                </div>
              </div>
              <div className="form-group">
                <CommonButton
                  extraClassName="btn btn-lg btn-primary btn-block"
                  htmlType="submit"
                  type="submit"
                  loading={loading}
                >
                  {t("text.adminAuth.reset")}
                </CommonButton>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default ResetPasswordForm;
