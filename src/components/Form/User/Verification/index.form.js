import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput, RippleEffect } from "../../..";
import { otpRegex } from "../../../../utils";

export default function UserVerificationForm({
  onSubmit,
  setOtp,
  otp,
  reSendOtp,
  counter,
  setStep,
  email,
  emailVerification = true,
  handleClose,
  loading,
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

  const onChangeInput = (event) => {
    let { name, value } = event.target;
    if (value.match(otpRegex())) {
      if (value.length === 6) {
        let optData = {};
        [...value].forEach((item, key) => {
          optData[`input${key + 1}`] = item?.[0];
        });
        movetoNext(event, "sixth", "fifth", "input6", event.target.maxLength);
        setOtp({ ...optData });
      } else {
        setOtp((data) => {
          return {
            ...data,
            [name]: value[0],
          };
        });
      }
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
      {() => {
        return (
          <Form>
            {emailVerification ? (
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
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "second",
                          "first",
                          "input1",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "third",
                          "first",
                          "input2",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "fourth",
                          "second",
                          "input3",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="third"
                      onFocus={() => onFocusInput("third")}
                      value={otp?.input3}
                    />
                    <TextInput
                      className="form-control text-center"
                      type="text"
                      // maxLength="1"
                      name="input4"
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "fifth",
                          "third",
                          "input4",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      // onKeyUp={(e) => movetoNext(e, "six", "five", "input5")}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "sixth",
                          "fourth",
                          "input5",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="fifth"
                      onFocus={() => onFocusInput("fifth")}
                      value={otp?.input5}
                      onKeyPress={(e) => onlyNumberKey(e)}
                    />
                    <TextInput
                      className="form-control text-center"
                      name="input6"
                      variant="standard"
                      type="text"
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      // onKeyUp={(e) => movetoNext(e, "six", "five", "input6")}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "sixth",
                          "fifth",
                          "input6",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="sixth"
                      onFocus={() => onFocusInput("sixth")}
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
                    loading={loading}
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
            ) : (
              <div className="">
                <div className="form-group">
                  <label className="form-label">
                    {" "}
                    {t("text.userProfile.enterVerifyCode")}
                  </label>
                  <div className="form-group VerifyInput d-flex">
                    <TextInput
                      className="form-control text-center"
                      name="input1"
                      variant="standard"
                      type="text"
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "second",
                          "first",
                          "input1",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "third",
                          "first",
                          "input2",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "fourth",
                          "second",
                          "input3",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="third"
                      onFocus={() => onFocusInput("third")}
                      value={otp?.input3}
                    />
                    <TextInput
                      className="form-control text-center"
                      type="text"
                      // maxLength="1"
                      name="input4"
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "fifth",
                          "third",
                          "input4",
                          e.target.maxLength
                        )
                      }
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
                      // maxlength="1"
                      // onKeyUp={(e) => movetoNext(e, "six", "five", "input5")}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "sixth",
                          "fourth",
                          "input5",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="fifth"
                      onFocus={() => onFocusInput("fifth")}
                      value={otp?.input5}
                      onKeyPress={(e) => onlyNumberKey(e)}
                    />
                    <TextInput
                      className="form-control text-center"
                      name="input6"
                      variant="standard"
                      type="text"
                      // maxlength="1"
                      onKeyPress={(e) => onlyNumberKey(e)}
                      // onKeyUp={(e) => movetoNext(e, "six", "five", "input6")}
                      onKeyUp={(e) =>
                        movetoNext(
                          e,
                          "sixth",
                          "fifth",
                          "input6",
                          e.target.maxLength
                        )
                      }
                      onChange={onChangeInput}
                      id="sixth"
                      onFocus={() => onFocusInput("sixth")}
                      value={otp?.input6}
                    />
                  </div>
                </div>
                <div className="d-sm-flex flex-wrap text-center text-sm-start justify-content-between modalFooter">
                  {counter === 0 ? (
                    <p className="text-sm font-sb mb-3 mb-sm-0">
                      Didn&#39;t received the <br />
                      code?{" "}
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
                    <p className="text-sm font-sb mb-3 mb-sm-0">
                      {t("text.userAuth.mobileNumberValidCode")}
                      <br className="d-none d-sm-block" /> for{" "}
                      <span className="text-500 font-bd">
                        {Timerformat(counter)}
                      </span>{" "}
                      {t("text.userAuth.sec")}
                    </p>
                  )}
                  <div>
                    <CommonButton onClick={() => handleClose()} variant="light">
                      {t("text.common.cancel")}
                    </CommonButton>
                    <CommonButton
                      loading={loading}
                      htmlType="submit"
                      type="submit"
                      variant="primary"
                      className="ms-3"
                    >
                      {t("text.common.submit")}
                    </CommonButton>
                  </div>
                </div>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
