

import { AdminChangePassword, AdminNotifications, AdminProfile } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.ADMIN_PROFILE.path,
      name: "Profile",
      key: adminRouteMap.ADMIN_PROFILE.path,
      private: true,
      belongsToSidebar: false,
      element: <AdminProfile />,
    },
    {
      path: adminRouteMap.ADMIN_CHANGE_PASSWORD.path,
      name: "Change Password",
      key: adminRouteMap.ADMIN_CHANGE_PASSWORD.path,
      private: true,
      belongsToSidebar: false,
      element: <AdminChangePassword />,
    },
    {
      path: adminRouteMap.ADMIN_NOTIFICATIONS.path,
      name: "Notifications",
      key: adminRouteMap.ADMIN_NOTIFICATIONS.path,
      private: true,
      belongsToSidebar: false,
      element: <AdminNotifications />,
    },
  ];
}
