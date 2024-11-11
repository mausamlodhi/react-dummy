import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ImageElement } from "../../../components";
import userRoutesMap from "../../../routeControl/userRouteMap";
import { UserLoginForm, UserVerificationForm } from "../../../components/Form";
import {
  logger,
  modalNotification,
  setLocalStorageToken,
} from "../../../utils";
import { login } from "../../../redux/AuthSlice/index.slice";
import { UserAuthServices } from "../../../services";

function Login() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(60);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [emailLoading, setLoading] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);

  const handleLogin = async (value) => {
    setLoading(true);
    try {
      if (value?.email) {
        setEmail(value?.email);
        let bodyData = {
          email: value?.email,
        };
        const response = await UserAuthServices.userLogin(bodyData);
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          setStep(2);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const handleVerification = async () => {
    setOTPLoading(true);
    try {
      let otpValue = "";
      for (let key in otp) {
        if (key) {
          otpValue += otp[key];
        }
      }
      if (otpValue && otpValue?.length === 6) {
        let bodyData = {
          email,
          otp: parseInt(otpValue),
          deviceId: "web",
          deviceType: "web",
        };
        const response = await UserAuthServices.userVerify(bodyData);
        if (response?.success) {
          modalNotification({
            type: "success",
            message: response?.message,
          });
          if (response?.data?.token && response?.data?.isEmailVerified === 1) {
            setLocalStorageToken(response?.data?.token);
            dispatch(login(response?.data));
            window.open(userRoutesMap.LOOPS.path, "_self");
            // navigate(userRoutesMap.LOOPS.path);
          } else {
            dispatch(login(response?.data));
            navigate(userRoutesMap.SIGNUP.path);
          }
        }
      } else {
        modalNotification({
          type: "error",
          message: "Please enter valid verification code",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setOTPLoading(false);
  };

  const reSendOtp = async () => {
    try {
      let bodyData = {
        email,
      };
      const response = await UserAuthServices.userLogin(bodyData);
      if (response?.success) {
        modalNotification({
          type: "success",
          message: response?.message,
        });
        setCounter(60);
      } else {
        modalNotification({
          type: "error",
          message: response?.message,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0 && step === 2) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, step]);

  return (
    <>
      <section className="authPage">
        <Row className="g-0 h-100 justify-content-center">
          <Col className="authPage_form h-100">
            <div className="d-flex h-100 justify-content-start align-items-center flex-column authPage_form_form">
              <div className="authPage_form_logo">
                <ImageElement
                  className="mx-auto d-block"
                  source="logo-dark.svg"
                  alt="loopity"
                />
              </div>

              {step === 1 && (
                <UserLoginForm onSubmit={handleLogin} loading={emailLoading} />
              )}
              {step === 2 && (
                <UserVerificationForm
                  onSubmit={handleVerification}
                  setOtp={setOtp}
                  otp={otp}
                  reSendOtp={reSendOtp}
                  setCounter={setCounter}
                  counter={counter}
                  setStep={setStep}
                  email={email}
                  loading={otpLoading}
                />
              )}
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}

export default Login;
