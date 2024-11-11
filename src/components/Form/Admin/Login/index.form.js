import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import { CommonButton } from "../../../UiElement";
import {
  Checkbox,
  Input as TextInput,
  Password as TextPassword,
} from "../../..";
import adminRouteMap from "../../../../routeControl/adminRouteMap";
import validation from "./validation";

export default function AdminLoginForm({
  onSubmit,
  adminAuthData,
  checked,
  setChecked,
  loading,
}) {
  const [showPassword, setShowPassword] = useState();
  let initialValues = {
    email: adminAuthData?.email || "",
    password: adminAuthData?.password || "",
    // rememberMe: adminAuthData?.rememberMe || "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={(e) => {
        onSubmit(e);
      }}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
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
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  {i18next.t("text.adminAuth.password")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  className="form-control form-control-lg"
                  name="password"
                  placeholder={i18next.t("text.adminAuth.passwordPlaceholder")}
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

            <div className="form-group">
              <div className="d-flex justify-content-between">
                <Checkbox
                  className=""
                  id="checkbox"
                  name="rememberMe"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                >
                  {i18next.t("text.adminAuth.rememberMe")}
                </Checkbox>

                <Link
                  className="link text-info link-sm"
                  to={adminRouteMap.FORGOT_PASSWORD.path}
                >
                  {i18next.t("text.adminAuth.forgotPasswordLink")}
                </Link>
              </div>
            </div>

            <div className="form-group">
              <CommonButton
                htmlType="submit"
                type="submit"
                loading={loading}
                // variant="warning"
                extraClassName="btn btn-lg btn-primary btn-block"
              >
                {i18next.t("text.adminAuth.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
