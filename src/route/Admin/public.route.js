
import { DesktopOutlined } from "@ant-design/icons";
import { AdminForgotPassword, AdminLogin, AdminOtpVerification, AdminResetPassword } from "../../pages";
import adminRouteMap from "../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.LOGIN.path,
      name: "Admin Login",
      key: adminRouteMap.LOGIN.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminLogin />,
    },
    {
      path: adminRouteMap.FORGOT_PASSWORD.path,
      name: "Admin Forgot Password",
      key: adminRouteMap.FORGOT_PASSWORD.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminForgotPassword />,
    },
    {
      path: adminRouteMap.RESET_PASSWORD.path,
      name: "Admin Reset Password",
      key: adminRouteMap.RESET_PASSWORD.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminResetPassword />,
    },
    {
      path: adminRouteMap.OTP_VERIFICATION.path,
      name: "Admin OTP Verification",
      key: adminRouteMap.OTP_VERIFICATION.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminOtpVerification />,
    },
  ];
}
