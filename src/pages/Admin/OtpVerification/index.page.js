import React from "react";
import { Link, useNavigate } from "react-router-dom";
import adminRouteMap from "../../../routeControl/adminRouteMap";
import { Input as TextInput, CommonButton, AuthLogo} from "../../../components";
import { modalNotification } from "../../../utils";

function OtpVerification() {
  const navigate = useNavigate();
  const resendCode = () =>{
      modalNotification({
          type: "success",
          message: "Code Sent Successfully"
      });
  }
  const verifySuccessfully = () =>{
      modalNotification({
          type: "success",
          message: "Verified Successfully"
      });
      setTimeout(() => {
          navigate(adminRouteMap.RESET_PASSWORD.path)
      }, 2000);
  }
  return (
      <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
          <AuthLogo/>
          <div className="card">
              <div className="card-inner card-inner-lg">
                  <div className="nk-block-head">
                      <div className="nk-block-head-content">
                          <h4 className="nk-block-title">Verification</h4>
                          <div className="nk-block-des">
                              <p>Please enter the verification code received on your email..</p>
                          </div>
                      </div>
                  </div>
                  <form>
                      <div className="form-group otp-group d-flex gx-2">
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                          <div className="col">
                              <TextInput
                                  className="form-control form-control-lg text-center"
                                  name="otp"
                                  disabled={false}
                                  variant="standard"
                                  type="text"
                                  placeholder=""
                                  setFieldValue=""
                                  icon=""
                              />
                          </div>
                      </div>
                      <div className="form-group text-center">
                          <Link className="link text-info" to="#" onClick={()=> resendCode()}>Resend Code</Link>
                      </div>
                      <div className="form-group">
                          <CommonButton
                          extraClassName="btn btn-lg btn-primary btn-block"
                          onClick={()=> verifySuccessfully()}
                          >Verify</CommonButton>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default OtpVerification;
