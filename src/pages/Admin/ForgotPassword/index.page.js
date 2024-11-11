import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLogo } from "../../../components";
import { logger, modalNotification } from "../../../utils";
import { AdminForgotPasswordForm } from "../../../components/Form";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { AdminAuthServices } from "../../../services/Admin/Auth/index.service";

function AdminForgotPassword() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleForgot = async (values) => {
    setLoading(true);
    try {
      let bodyData = values;
      // let bodyData = {
      //   email: "backend@mailinator.com",
      // };
      const response = await AdminAuthServices.adminForgotPassword(bodyData);
      const { success, message } = response;

      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        // dispatch(forgetPassword(bodyData));
        navigate(adminRouteMap.LOGIN.path);
      } else {
        modalNotification({
          type: "error",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  // const handleVerification = async () => {
  //   try {
  //     if (
  //       otp?.input1 &&
  //       otp?.input2 &&
  //       otp?.input3 &&
  //       otp?.input4 &&
  //       otp?.input5 &&
  //       otp?.input6
  //     ) {
  //       console.log("otp", otp);
  //       navigate(adminRouteMap.RESET_PASSWORD.path);
  //     } else {
  //       modalNotification({
  //         type: "error",
  //         message: "Please enter valid verification code",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const reSendOtp = async () => {
  //   try {
  //     setCounter(30);
  //   } catch (error) {
  //     logger(error);
  //   }
  // };

  // useEffect(() => {
  //   let timer;
  //   if (counter > 0 && step === 2) {
  //     timer = setTimeout(() => setCounter((c) => c - 1), 1000);
  //   }

  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [counter, step]);

  return (
    <>
      <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
        <AuthLogo />
        <div className="card">
          <div className="card-inner card-inner-lg">
            <AdminForgotPasswordForm
              onSubmit={handleForgot}
              loading={loading}
            />
            {/* {step === 1 && <AdminForgotPasswordForm onSubmit={handleForgot} />} */}
            {/* {step === 2 && (
              <AdminVerificationForm
                onSubmit={handleVerification}
                setOtp={setOtp}
                otp={otp}
                reSendOtp={reSendOtp}
                setCounter={setCounter}
                counter={counter}
                setStep={setStep}
                email={email}
              />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminForgotPassword;
