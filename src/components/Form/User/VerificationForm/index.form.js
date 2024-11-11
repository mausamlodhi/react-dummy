import { Form, Formik } from "formik";
import React, { useState } from "react";
import { CommonButton, Input as TextInput, RippleEffect } from "../../..";
import { Link } from "react-router-dom";
import { otpRegex } from "../../../../utils";
import { useTranslation } from "react-i18next";

export default function UserVerificationForm({
  onSubmit,
  setOtp,
  otp,
  reSendOtp,
  counter,
  setStep,
  email,
}) {
  const { t } = useTranslation();
  let initialValues = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  };

  const onChangeInput = (event) => {
    let { name, value } = event.target;

    if (value.match(otpRegex())) {
      setOtp((data) => {
        return {
          ...data,

          [name]: value,
        };
      });
    }
  };

  const movetoNext = (e, nextFieldID, prevFieldID, currentFieldId) => {
    if (e.target.value.length >= e.target.maxLength) {
      if (e.target.value.match(otpRegex())) {
        document.getElementById(nextFieldID).focus();
      }
    }
    if (e.keyCode === 8) {
      let data = { ...otp };
      data[currentFieldId] = "";
      setOtp(data);
      document.getElementById(prevFieldID).focus();
    }
  };

  const onFocusInput = (currentFieldId) => {
    document.getElementById(currentFieldId).select();
  };

  function onlyNumberKey(evt) {
    let ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      evt.preventDefault();
    }
  }

  const Timerformat = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    let secs = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${secs}`;
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      {(props) => {
        return (
          <Form>
            <div className="d-flex flex-column authPage_form_field">
              <div className="authPage_form_head">
                <h1 className="font-bd">
                  {t("text.userAuth.enterVerificationCode")}✍️
                </h1>
                <p className="mt-0">
                  {t("text.userAuth.pleaseEnterVerificationCode")}
                  <Link to="#" className="link-primary">
                    {" "}
                    {email}
                  </Link>
                </p>
                <div>
                  <Link
                    to="#"
                    onClick={() => setStep(1)}
                    className="font-sb numberEdit"
                  >
                    <em className="icon icon-edit-pencil" />
                    {t("text.userAuth.changeEmail")}
                  </Link>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {" "}
                  {t("text.userAuth.enterVerificationCode")}
                </label>
                <div className="form-group VerifyInput d-flex">
                  <TextInput
                    className="form-control text-center"
                    name="input1"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyPress={(e) => onlyNumberKey(e)}
                    onKeyUp={(e) => movetoNext(e, "second", "first", "input1")}
                    onChange={onChangeInput}
                    id="first"
                    onFocus={() => onFocusInput("first")}
                    value={otp?.input1}
                  />
                  <TextInput
                    className="form-control text-center"
                    name="input2"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyPress={(e) => onlyNumberKey(e)}
                    onKeyUp={(e) => movetoNext(e, "third", "second", "input2")}
                    onChange={onChangeInput}
                    id="second"
                    onFocus={() => onFocusInput("second")}
                    value={otp?.input2}
                  />
                  <TextInput
                    className="form-control text-center"
                    name="input3"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyPress={(e) => onlyNumberKey(e)}
                    onKeyUp={(e) => movetoNext(e, "fourth", "third", "input3")}
                    onChange={onChangeInput}
                    id="third"
                    onFocus={() => onFocusInput("third")}
                    value={otp?.input3}
                  />
                  <TextInput
                    className="form-control text-center"
                    name="input4"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyPress={(e) => onlyNumberKey(e)}
                    onKeyUp={(e) => movetoNext(e, "five", "fourth", "input4")}
                    onChange={onChangeInput}
                    id="fourth"
                    onFocus={() => onFocusInput("fourth")}
                    value={otp?.input4}
                  />
                  <TextInput
                    className="form-control text-center"
                    name="input5"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyUp={(e) => movetoNext(e, "six", "five", "input5")}
                    onChange={onChangeInput}
                    id="five"
                    onFocus={() => onFocusInput("five")}
                    value={otp?.input5}
                    onKeyPress={(e) => onlyNumberKey(e)}
                  />
                  <TextInput
                    className="form-control text-center"
                    name="input6"
                    variant="standard"
                    type="text"
                    maxlength="1"
                    onKeyPress={(e) => onlyNumberKey(e)}
                    onKeyUp={(e) => movetoNext(e, "six", "five", "input6")}
                    onChange={onChangeInput}
                    id="six"
                    onFocus={() => onFocusInput("six")}
                    value={otp?.input6}
                  />
                </div>
              </div>
              <div className="form-group text-center">
                {counter === 0 ? (
                  <p className="text-center d-inline me-2 mb-0 font-sb">
                    Didn&#39;t received the code?{" "}
                    <Link
                      className="font-sb text-center link-primary"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        reSendOtp();
                        setOtp({
                          input1: "",
                          input2: "",
                          input3: "",
                          input4: "",
                          input5: "",
                          input6: "",
                        });
                      }}
                    >
                      {t("text.userAuth.resend")}
                    </Link>
                  </p>
                ) : (
                  <p className="text-center mb-0 font-sb">
                    {t("text.userAuth.validCode")}{" "}
                    <span className="link-primary font-bd">
                      {Timerformat(counter)}
                    </span>{" "}
                    {t("text.userAuth.sec")}
                  </p>
                )}
              </div>
              <RippleEffect>
                <CommonButton
                  htmlType="submit"
                  type="submit"
                  variant="warning"
                  extraClassName="w-100 authPage_form_signUp"
                >
                  {" "}
                  <em className="icon-circle-next icon-left" />
                  {t("text.common.submit")}
                </CommonButton>
              </RippleEffect>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
