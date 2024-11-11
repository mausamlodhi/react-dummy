const Auth = {
  accountLogin: {
    url: "/admin/login",
    method: "POST",
  },
  changePassword: {
    url: "/admin/change-password",
    method: "PATCH",
  },
  accountForgot: {
    url: "/admin/forgot-password",
    method: "PATCH",
  },
  resetPassword: {
    url: "/admin/reset-password",
    method: "PATCH",
  },
  accountUpdate: {
    url: "/admin",
    method: "PUT",
  },
  updateProfileImage: {
    url: "/admin/update-profile-image",
    method: "PATCH",
  },
  accountLogout: {
    url: "/logout",
    method: "POST",
  },
};
export default Auth;
