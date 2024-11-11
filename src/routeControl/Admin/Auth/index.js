import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  LOGIN: {
    path: `${baseRoutes.adminBaseRoutes}`,
  },
  FORGOT_PASSWORD: {
    path: `${baseRoutes.adminBaseRoutes}/forgot-password`,
  },
  RESET_PASSWORD: {
    path: "/reset-password/:token",
  },
  OTP_VERIFICATION: {
    path: `${baseRoutes.adminBaseRoutes}/otp-verification`,
  },
  CHANGE_PASSWORD: {
    path: `${baseRoutes.adminBaseRoutes}/change-password`,
  },
};

export default accessRoute;
