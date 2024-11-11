const Auth = {
  accountLogin: {
    url: "/send-otp",
    method: "POST",
  },
  accountVerify: {
    url: "/verify-otp",
    method: "POST",
  },
  accountSignUp: {
    url: "/signup",
    method: "POST",
  },
  updateProfile: (id) => ({
    url: `/user/${id}`,
    method: "PUT",
  }),
  accountLogout: {
    url: "/logout",
    method: "POST",
  },
  updatePhoneNumber: {
    url: "/user/change-phone-number",
    method: "POST",
  },
  verifyOtp: {
    url: "/user/verify-phone-number",
    method: "POST",
  },
};
export default Auth;
