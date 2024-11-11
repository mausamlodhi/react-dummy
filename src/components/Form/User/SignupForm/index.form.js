import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Checkbox,
  CommonButton,
  ImageElement,
  Input as TextInput,
  RippleEffect,
} from "../../..";
import { validation } from "./validation";

export default function SignUpForm({ onSubmit, loading }) {
  const { t } = useTranslation();
  let initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
    termAndCondtion: false,
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <>
              <div className="authPage_form_logo">
                <ImageElement
                  className="mx-auto d-block"
                  source="logo-dark.svg"
                  alt="loopity"
                />
              </div>
              <div className="d-flex flex-column authPage_form_field">
                <div className="authPage_form_head">
                  <h1 className="font-bd">
                    {t("text.userAuth.completeProfile")}sas
                  </h1>
                  <span> {t("text.userAuth.competeProfileText")}</span>
                </div>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="fname">
                          {t("text.common.firstName")}
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="firstName"
                          className="form-control form-control-lg"
                          name="firstName"
                          variant="standard"
                          type="firstName"
                          placeholder={t("text.common.firstName")}
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="lname">
                          {t("text.common.lastName")}
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <TextInput
                          id="lastName"
                          className="form-control form-control-lg"
                          name="lastName"
                          variant="standard"
                          type="name"
                          placeholder={t("text.common.lastName")}
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label">
                        {t("text.common.phoneNumber")}
                      </label>
                    </div>
                    <div className="form-control-wrap phoneNumber">
                      <TextInput
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-control"
                        placeholder={t("text.common.phoneNumber")}
                        type="text"
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="cname">
                        {t("text.userAuth.companyName")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <TextInput
                        id="companyName"
                        className="form-control form-control-lg"
                        name="companyName"
                        variant="standard"
                        type="name"
                        placeholder={t("text.userAuth.companyName")}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                  <Checkbox
                    className="font-rg mb-2 align-items-center signupCheck"
                    id="checkbox"
                    name="termAndCondtion"
                    onChange={(e) => {
                      e.preventDefault();
                      props.setFieldValue("termAndCondtion", e.target.checked);
                    }}
                  >
                    {t("text.userAuth.iAgreeWith")}{" "}
                    <Link to="" className="link-primary">
                      {t("text.userAuth.termsAndCondition")}
                    </Link>{" "}
                    {t("text.userAuth.and")}{" "}
                    <Link to="" className="link-primary">
                      {t("text.userAuth.privacyPolicy")}
                    </Link>
                  </Checkbox>
                </Row>
                <RippleEffect>
                  <CommonButton
                    loading={loading}
                    disabled={loading || !props.values.termAndCondtion}
                    htmlType="submit"
                    type="submit"
                    variant="warning"
                    extraClassName="w-100 authPage_form_signUp"
                  >
                    <em className="icon-circle-next icon-left" />{" "}
                    {t("text.common.submit")}
                  </CommonButton>
                </RippleEffect>
              </div>
            </>
          </Form>
        );
      }}
    </Formik>
  );
}
