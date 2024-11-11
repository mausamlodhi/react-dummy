import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CommonButton, Input as TextInput } from "../../..";
import { otpRegex } from "../../../../utils";

export default function AdminVerificationForm({
  onSubmit,
  setOtp,
  otp,
  reSendOtp,
  counter,
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
      {() => {
        return (
          <Form>
            <div className="nk-block-head">
              <div className="nk-block-head-content">
                <h4 className="nk-block-title">
                  {t("text.common.verification")}
                </h4>
                <div className="nk-block-des">
                  <p>{t("text.adminAuth.verifyCodeMessage")}</p>
                </div>
              </div>
            </div>
            <div className="form-group otp-group d-flex gx-2">
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
              </div>
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
              </div>
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
              </div>
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
              </div>
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
              </div>
              <div className="col">
                <TextInput
                  className="form-control form-control-lg text-center"
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
                <div className="form-group text-center">
                  <Link
                    className="link text-info"
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
                    {t("text.adminAuth.resendCode")}
                  </Link>
                </div>
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
            <div className="form-group">
              <CommonButton
                htmlType="submit"
                type="submit"
                extraClassName="btn btn-lg btn-primary btn-block"
              >
                {t("text.common.verify")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
